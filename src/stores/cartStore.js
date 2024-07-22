import { atom, map } from "nanostores";

export const cartItems = map({});

export function addCartItem({ sku, name, price, image, attributes }) {
  const existingEntry = cartItems.get()[sku];
  if (existingEntry) {
    cartItems.setKey(sku, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(sku, {
      sku,
      name,
      price,
      image,
      attributes,
      quantity: 1,
    });
  }
};

export function removeCartItem({sku}) {
  cartItems.setKey(sku, undefined)
}