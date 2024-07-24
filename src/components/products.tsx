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
            <div className="flex flex-wrap gap-5">
                {products?.children?.map((product: any, index: number) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </div>
    );
};
