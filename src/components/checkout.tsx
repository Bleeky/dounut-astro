import { useStore } from "@nanostores/react";
import { useState, useEffect } from "react";
import type { LocalCartItem } from "../use-cases/contracts/LocalCartItem";
import { cartItems, emptyCart } from "../stores/cartStore";

export const CheckoutForm = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
  });

  const { firstName, lastName, email, street, city, postalCode } = state;

  const $cartItems = useStore(cartItems);
  const total = Object.values($cartItems)?.reduce(
    (amount: number, item: any) => item.price * item.quantity + amount,
    0
  );
  console.log($cartItems);

  const checkoutModel: any = {
    basketModel: $cartItems,
    customer: {
      firstName,
      lastName,
      identifier: email,
      addresses: [
        { type: "billing", email },
        {
          type: "delivery",
          street,
          city,
          postalCode,
        },
      ],
    },
    total: {
      currency: "USD",
      gross: total,
      net: total,
      tax: {
        name: "No Ttax",
        percent: 0,
      },
    },
    payment: {
      provider: "custom",
      custom: {
        properties: {
          property: "payment_method",
          value: "Crystal Coin",
        },
      },
    },
  };

  const handleClick = async () => {
    let response = await fetch("/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutModel),
    }).then((res) => res.json());

    if (response?.orders?.create?.id) {
      emptyCart();
      window.Bird.contact.identify(
        {
          strategy: "Visitor",
          identifier: { key: "emailaddress", value: "tarantino@gmail.com" },
        },
        { subscribedEmail: true }
      );
      window.Bird.tracker.ecommerce.orderConfirmed({
        checkout_url: "https://dounut-astro-ashy.vercel.app/checkout",
        product_names: Object.values($cartItems).map((item: any) => item.name),
        product_skus: Object.values($cartItems).map((item: any) => item.sky),
        total_price: total,
        currency: "EUR",
        customer_email: "tarantino@gmail.com",
      });
      window.location.href = `/order/${response.orders.create.id}`;
    }
  };

  const handleAbandonned = () => {
    window.Bird.contact.identify(
      {
        strategy: "Visitor",
        identifier: { key: "emailaddress", value: "tarantino@gmail.com" },
      },
      { subscribedEmail: true }
    );
    window.Bird.tracker.ecommerce.checkoutAbandoned({
      checkout_url: "https://dounut-astro-ashy.vercel.app/checkout",
      product_names: Object.values($cartItems).map((item: any) => item.name),
      product_skus: Object.values($cartItems).map((item: any) => item.sky),
      total_price: total,
      currency: "EUR",
      customer_email: "tarantino@gmail.com",
    });
  };

  return (
    <div className="p-10 mx-auto bg-background1 w-128 mt-20">
      <h1 className="text-text text-3xl font-bold mb-10 text-center">
        Checkout
      </h1>
      <div className="mx-auto">
        <form method="post" className="flex flex-wrap gap-5">
          <input
            type="text"
            name="First Name"
            placeholder="First name"
            className="w-full p-3 border border-text"
            required
            onChange={(e) => setState({ ...state, firstName: e.target.value })}
          />
          <input
            type="text"
            name="Last Name"
            required
            placeholder="Last name"
            className="w-full  p-3 border border-text"
            onChange={(e) => setState({ ...state, lastName: e.target.value })}
          />
          <input
            type="text"
            name="Email"
            required
            placeholder="Email"
            className="w-full  p-3 border border-text"
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <input
            type="text"
            name="Street"
            placeholder="Street"
            className="w-full  p-3 border border-text"
            onChange={(e) => setState({ ...state, street: e.target.value })}
          />
          <input
            type="text"
            name="City"
            placeholder="City"
            className="w-full  p-3 border border-text"
            onChange={(e) => setState({ ...state, city: e.target.value })}
          />
          <input
            type="text"
            name="Postal Code"
            placeholder="Postal Code"
            className="w-full p-3 border border-text"
            onChange={(e) => setState({ ...state, postalCode: e.target.value })}
          />
        </form>
        <button
          className="w-full bg-teal-600 text-white p-3 mt-10 rounded font-semibold text-center"
          onClick={handleClick}
        >
          Pay Now
        </button>
        <button
          className="w-full bg-teal-600 text-white p-3 mt-10 rounded font-semibold text-center"
          onClick={handleAbandonned}
        >
          Mark as abandoned
        </button>
      </div>
    </div>
  );
};
