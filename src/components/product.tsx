import { useState, useEffect } from "react";
import { ContentTransformer, Image } from "@crystallize/reactjs-components";
import { ProductBody } from "./product-body";
import { VariantSelector } from "./variant-selector";
import { RelatedProducts } from "./related-products";
import {
  getCurrencySymbol,
  getDefaultPriceVariant,
  variantToCartItem,
} from "../use-cases/utils";
import type { Product as ProductType } from "../use-cases/contracts/Product";
import { addCartItem } from "../stores/cartStore";

export const Product = ({ product }: { product: ProductType }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0]
  );
  const [priceWithSymbol, setPriceWithSymbol] = useState('');
  const onVariantChange = (variant: any) => setSelectedVariant(variant);
  const defaultPrice = getDefaultPriceVariant(selectedVariant?.priceVariants);
  const [buttonText, setButtonText] = useState("Add to Cart");
  useEffect(() => {
    setPriceWithSymbol(
      getCurrencySymbol(
        defaultPrice?.currency ?? "EUR",
        defaultPrice?.price ?? 0.0
      )
    );
  }, []);

  const addToCart = (product: any) => {
    setButtonText("Adding...");
    addCartItem(variantToCartItem(product));
    setButtonText("Added 🎉");
    setTimeout(() => setButtonText("Add to Cart"), 1000);
  };

  return (
    <>
      <div className="flex lg:flex-row gap-2 w-full items-center flex-col">
        <div className="flex flex-col text-text w-[400px]">
          <h1 className="font-extrabold text-5xl mb-3">{product.name}</h1>
          <ContentTransformer json={product?.summary?.content?.json as [any]} />
        </div>
        <Image
          {...selectedVariant?.images[0].variants[selectedVariant?.images[0].variants?.length - 1]}
          sizes="500px"
          className="rounded-sm mx-auto"
        />
        <div className="lg:mb-0 mb-5">
          <VariantSelector
            variants={product.variants!}
            selectedVariant={selectedVariant!}
            onVariantChange={onVariantChange}
          />
        </div>
      </div>
      <div className="flex z-10 justify-between lg:w-5/12 w-8/12 mx-auto bg-white p-5 text-text rounded-xl mt-6">
        <div>
          <p className="font-semibold text-sm">Total price</p>
          <p className="font-bold text-lg">
            {priceWithSymbol}
          </p>
        </div>
        <button
          className="bg-background2 px-4 rounded-xl"
          onClick={() => addToCart(selectedVariant)}
        >
          {buttonText}
        </button>
      </div>
      <ProductBody
        description={product.description}
        dimensions={product.dimensions}
      />
      <p className="text-text mb-4 font-semibold">Related products</p>
      <RelatedProducts related={product.related} />
    </>
  );
};
