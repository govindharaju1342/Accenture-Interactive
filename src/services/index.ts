import axios from 'axios'
import { get } from '../utils/helpers'
const baseUrl = process.env.REACT_APP_BASEURL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    Accept: 'application/json',
    'authorization': localStorage.getItem('auth') || ''
  },
})

export const getProductList = async () => { 
  try {
    const planRequestRequest = await axiosInstance.get('products')
    return get(planRequestRequest, 'data.data.values', '')
  } catch (error) {
    console.error('plan list - Error', error)
  }
}
