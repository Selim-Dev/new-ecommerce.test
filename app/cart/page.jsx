"use client";
import React, { useEffect } from "react";
import { useCartContext } from "../_context/CartContext";
import Image from "next/image";
import CartApis from "../_utils/CartApis";
import { useRouter } from "next/navigation";


const Cart = () => {
  const { cart, setCart } = useCartContext();
  const router = useRouter();
  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.map((item) => {
      totalAmount = totalAmount + Number(item?.product?.attributes?.price);
    });
    return totalAmount.toFixed(2);;
  };
  const removeItemFromCart = (id) =>
    CartApis.deleteCartItem(id)
      .then((res) => {
        if (res)
          setCart((cartItems) =>
            cartItems.filter((item) => item?.id !== res?.data?.data?.id)
          );
      })
      .catch((err) => console.log(err));
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {cart.map((item) => {
                return (
                  <li key={item.id} className="flex items-center gap-4">
                    <Image
                      src={
                        item?.product?.attributes?.banner?.data?.attributes?.url
                      }
                      alt="cart banner"
                      className="size-16 rounded object-cover"
                      width={100}
                      height={100}
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
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-4">
                      <h2 className="font-bold ">
                        $ {item?.product?.attributes?.price}
                      </h2>
                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="text-gray-600 transition hover:text-red-600"
                      >
                        <span className="sr-only">Remove item</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-[320px] space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between bg-gray-200 p-4 rounded-lg !text-base font-medium">
                    <dt>Total</dt>
                    <dd>$ {getTotalAmount()}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      router.push(`/checkout?amount=${getTotalAmount()}`)
                    }
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
