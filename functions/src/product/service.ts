 import { products } from './mockData';

/**
 * Serivce to handle the products
 * @returns
 */
const getProductList = async () => {
  console.log("products", products);
  return products;
};
 
const service = { getProductList };
export default service;
