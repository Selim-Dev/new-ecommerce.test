import Image from "next/image";
import React from "react";

function ProductBanner({ product }) {
  return (
    <div>
      {product?.attributes?.banner?.data?.attributes?.url ? (
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="product-details-banner"
          width={500}
          height={350}
          className="rounded-lg border "
        />
      ) : (
        <div className="w-[470px] h-[335px] bg-slate-200 animate-pulse rounded-lg"></div>
      )}
    </div>
  );
}

export default ProductBanner;
