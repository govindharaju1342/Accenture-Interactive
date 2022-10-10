import axios from 'axios'
import { get } from '../utils/helpers'
const baseUrl = process.env.REACT_APP_BASEURL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
})

export const getProductList = async () => {
  try {
    const productRequestRequest = await axiosInstance.get('products')
    return get(productRequestRequest, 'data', [])
  } catch (error) {
    console.error('product list - Error', error)
    return []
  }
}
