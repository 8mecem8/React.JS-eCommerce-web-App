import axios from "axios";



export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, {product}, {
    headers: {
      authtoken,
    },
  });



export const getAllProductsByCounts = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${count}`);


export const getTotalNumberProducts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);




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


  export const getProductsByOrder = async (sort, order, page , perPAge) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {sort, order, page, perPAge});


  export const getSingleProductDetails = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/products/:${slug}`);





  export const starUpdateProduct= async (authtoken, productId,star) =>
  await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`,{star} ,{
    headers: {
      authtoken,
    },
  });


  
export const getRelated = async (productId) =>
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);




  export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);


  export const getColors = async () =>
  await axios.get(`${process.env.REACT_APP_API}/filter/color`);