import type { CellProps } from "../../use-cases/contracts/Cell";
import { getCurrencySymbol } from "../../use-cases/utils";

export const GridItem = ({ cell }: CellProps) => {
  if (!cell.item) return null;
  return (
    <a href={`/shop${cell?.item?.path}`} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-2 xl:aspect-w-6">
        <img
          src={
            cell.item?.variants?.[0]?.images?.[0].variants[
              cell.item?.variants?.[0]?.images?.[0].variants?.length - 1
            ].url
          }
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{cell.item?.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {getCurrencySymbol(
          cell.item?.variants[0]?.priceVariant?.currency ?? "EUR",
          cell.item?.variants[0]?.priceVariant?.price ?? 0.0
        )}
      </p>
    </a>
  );
};
