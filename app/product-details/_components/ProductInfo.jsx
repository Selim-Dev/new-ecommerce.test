"use client";
import { AlertOctagon, BadgeCheck, ListIcon, ShoppingCart } from "lucide-react";
import React from "react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../_utils/CartApis";
import { useCartContext } from "../../_context/CartContext";

const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id],
        },
      };
      CartApis.addToCart(data)
        .then((res) => {
          setCart((oldCart) => [
            ...oldCart,
            { id: res?.data?.data?.id, product },
          ]);
        })
        .catch((err) => console.log(err));
    }
  };
  const { cart, setCart } = useCartContext();
  return (
    <div>
      {product?.id ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{product?.attributes?.title}</h2>
          <h2 className="flex gap-2 text-sm items-center">
            <ListIcon size={17} className="text-gray-500" />
            {product?.attributes?.category}
          </h2>
          <h2>{product?.attributes?.disc[0]?.children[0]?.text}</h2>
          <h2 className="flex gap-2 text-sm items-center text-gray-500">
            {product?.attributes?.instantDelivery ? (
              <BadgeCheck className=" text-green-600" />
            ) : (
              <AlertOctagon />
            )}
            Eligible for instant delivery
          </h2>
          <h2 className="text-xl font-bold text-green-600">
            $ {product?.attributes?.price}
          </h2>
          <button
            onClick={handleAddToCart}
            className="flex gap-2 w-fit bg-primary p-3 rounded-lg text-gray-50 soft-300 hover:scale-105"
          >
            <ShoppingCart /> Add to cart
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
};

export default ProductInfo;
