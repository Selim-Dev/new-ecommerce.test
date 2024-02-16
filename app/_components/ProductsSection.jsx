"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import productsApi from "../_utils/productsApi";

function ProductsSection() {
  const [productsList, setProductsList] = useState([]);
  const getLatestProducts_ = () => {
    productsApi
      .getLatestProducts()
      .then((res) => setProductsList(res.data.data));
  };
  useEffect(() => {
    getLatestProducts_();
  }, []);
  return (
    <div className="px-10 md:px-20 py-20 bg-gray-50">
      <p className="font-bold text-xl pb-5">Buy a certificate</p>
      <ProductList productsList={productsList} />
    </div>
  );
}

export default ProductsSection;
