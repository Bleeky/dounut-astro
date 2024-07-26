import { TopicsDisplayer } from "./topics-displayer";
import type { RelatedItem } from "../use-cases/contracts/RelatedItem";
import { getCurrencySymbol } from "../use-cases/utils";
import { useState, useEffect } from "react";

export const RelatedProducts = ({
  related,
}: {
  related: { content: { items: RelatedItem[] } };
}) => {
  const [relatedItems, setRelatedItems] = useState<RelatedItem[]>([]);
  useEffect(() => {
    setRelatedItems(
      related?.content?.items?.map((item) => ({
        ...item,
        priceWithSymbol: getCurrencySymbol(
          item.defaultVariant?.priceVariant?.currency ?? "EUR",
          item.defaultVariant?.priceVariant?.price ?? 0.0
        ),
      }))
    );
  }, []);

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-8">
      {relatedItems?.map((item, index: number) => {
        return (
          <a href={`/shop${item.path}`} key={index} className="group grid grid-rows-1">
            <TopicsDisplayer topics={item.topics} />
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={item.defaultVariant?.firstImage.url}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {getCurrencySymbol(
                item.defaultVariant?.priceVariant?.currency ?? "EUR",
                item.defaultVariant?.priceVariant?.price ?? 0.0
              )}
            </p>
          </a>
        );
      })}
    </div>
  );
};
