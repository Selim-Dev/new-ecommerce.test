"use client";
import BreadCrumb from "../../_components/BreadCrumb";
import productsApi from "../../_utils/productsApi";
import React, { useEffect, useState } from "react";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductList from "../../_components/ProductList.jsx";
import { usePathname } from "next/navigation";

function ProductDetails({ params }) {
  const path = usePathname().split("/").slice(1);
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const getProductById_ = () => {
    productsApi.getProductById(params?.productId).then((res) => {
      setProductDetails(res?.data?.data);
      getProductsByCategory(res?.data?.data);
    });
  };
  const getProductsByCategory = (product) => {
    productsApi
      .getProductsByCategory(product?.attributes?.category, product?.id)
      .then((res) => setSimilarProducts(res?.data?.data));
  };
  useEffect(() => {
    getProductById_();
  }, [params?.productId]);
  return (
    <div className="py-20 container">
      <BreadCrumb path={path} />
      <div className="grid gap-5 grid-cols-1 mt-10 md:grid-cols-2">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="text-xl mt-20 mb-6 font-bold">Similar Products</h2>
        <ProductList productsList={similarProducts} />
      </div>
    </div>
  );
}

export default ProductDetails;
