import type { ProductCard as ProductCardType } from "../use-cases/contracts/ProductCard";
import { TopicsDisplayer } from "./topics-displayer";
import { getCurrencySymbol } from "../use-cases/utils";

export const ProductCard = ({ product }: ProductCardType) => {
  const isBundle = product?.bundle?.content?.value;
  return (
    <>
      {!isBundle && (
        <a href={product?.path} className="group grid grid-rows-1">
          <TopicsDisplayer topics={product.topics} />
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={
                product?.defaultVariant.firstImage.variants[
                  product?.defaultVariant.firstImage.variants.length - 1
                ].url
              }
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {getCurrencySymbol(
              product?.defaultVariant.priceVariant.currency ?? "EUR",
              product?.defaultVariant.priceVariant.price ?? 0.0
            )}
          </p>
        </a>
      )}
    </>
  );
};
