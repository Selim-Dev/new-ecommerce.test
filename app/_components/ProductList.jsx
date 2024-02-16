import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ productsList }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productsList.map((item) => (
        <ProductItem product={item} key={item.id} />
      ))}
    </div>
  );
}

export default ProductList;
