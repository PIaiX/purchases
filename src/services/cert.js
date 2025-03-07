import { apiRoutes } from '../config/api'
import { $api } from './index'

const getCerts = async (data) => {
    const response = await $api.get(apiRoutes.CERTS, { params: data })
    return response?.data
}
const getCert = async (data) => {
    const response = await $api.get(apiRoutes.CERT, { params: data })
    return response?.data
}

export { getCerts, getCert }
