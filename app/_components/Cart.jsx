'use client'
import React from "react";
import { useCartContext } from "../_context/CartContext";
import Link from "next/link";

const Cart = () => {
  const { cart, setCart, openCart, setOpenCart } = useCartContext();
  return (
    <div className="w-[280px] h-[300px] bg-gray-100 z-10 rounded-lg border shadow-sm absolute mx-10 right-10 top-14 p-5 overflow-auto">
      <button
        onClick={() => setOpenCart(false)}
        className="absolute text-gray-600 transition end-4 top-4 hover:scale-110"
      >
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart.map((item) => {
            return (
              <li key={item.id} className="flex items-center gap-4">
                <img
                  src={item?.product?.attributes?.banner?.data?.attributes?.url}
                  alt="cart-item"
                  className="object-cover rounded size-16"
                />

                <div>
                  <h3 className="text-sm text-gray-900">
                    {item?.product?.attributes?.title}
                  </h3>

                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Category: </dt>
                      <dd className="inline">
                        {item?.product?.attributes?.category}
                      </dd>
                    </div>

                    <div>
                      <dt className="inline">Price: </dt>
                      <dd className="inline">
                        {item?.product?.attributes?.price}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block px-5 py-3 text-sm text-gray-100 transition bg-gray-700 rounded hover:bg-gray-600"
          >
            View my cart ({cart.length})
          </Link>
          <Link
            href="/"
            className="inline-block text-sm text-gray-500 underline transition underline-offset-4 hover:text-gray-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
