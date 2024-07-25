import type { ProductCard as ProductCardType } from "../use-cases/contracts/ProductCard";
import { ProductCard } from "./product-card";

export const Products = ({
    products,
}: {
    products: { children: ProductCardType[] };
}) => {
    return (
        <div className="mt-20">
            <p className="text-lg font-semibold mb-10">All items</p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 xl:gap-x-5">
                {products?.children?.map((product: any, index: number) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
};
