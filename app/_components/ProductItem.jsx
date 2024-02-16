import { ListIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductItem({ product }) {
  return (
    <Link
      href={`/product-details/${product?.id}`}
      className="border p-2 rounded-xl hover:border-primary hover:scale-[103%] hover:shadow-md soft-300 cursor-pointer group"
    >
      <Image
        src={product?.attributes?.banner?.data?.attributes?.url}
        alt="card_img"
        width={400}
        height={350}
        priority={false}
        className="rounded-t-lg h-[170px] object-cover soft-300"
      />
      <div className="p-3 flex items-center justify-between">
        <div>
          <h2 className="group-hover:text-primary soft-300">
            {product?.attributes?.title}
          </h2>
          <h2 className="flex gap-2 text-[12px] items-center pt-2">
            <ListIcon size={17} className="text-gray-500" />
            {product?.attributes?.category}
          </h2>
        </div>
        <h2>${product?.attributes?.price}</h2>
      </div>
    </Link>
  );
}

export default ProductItem;
