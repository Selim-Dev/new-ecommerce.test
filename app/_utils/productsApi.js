const { default: axiosClient } = require("./axiosClient");

const getLatestProducts = () => axiosClient.get("/products?populate=*");
const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);
const getProductsByCategory = (category,id) =>
  axiosClient.get(
    `/products?filters[category][$eq]=${category}&filters[id][$ne]=${id}&populate=*`
  );

export default { getLatestProducts, getProductById, getProductsByCategory };
