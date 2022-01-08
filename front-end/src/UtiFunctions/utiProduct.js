import axios from "axios";



export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, {product}, {
    headers: {
      authtoken,
    },
  });



export const getAllProductsByCounts = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);


export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });


  export const updateSingleProduct = async (slug, authtoken, product) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`,{product} ,{
    headers: {
      authtoken,
    },
  });


  export const getProductsByOrder = async (sort, order, limit) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {sort, order, limit});

