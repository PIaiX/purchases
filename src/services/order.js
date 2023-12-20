import { apiRoutes } from '../config/api'
import { $authApi } from './index'

const createOrder = async (data) => {
    const response = await $authApi.post(apiRoutes.ORDER_CREATE, data)
    return response?.data
}
const editOrder = async (data) => {
    const response = await $authApi.put(apiRoutes.ORDER_EDIT, data)
    return response?.data
}
const getOrders = async (data) => {
    const response = await $authApi.get(apiRoutes.ORDERS_GET_ALL, { params: data })
    return response?.data
}
const getOrder = async (data) => {
    const response = await $authApi.get(apiRoutes.ORDERS_GET_ONE, { params: data })
    return response?.data
}

export { createOrder, getOrder, getOrders, editOrder }
