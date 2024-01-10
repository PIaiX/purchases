import { apiRoutes } from '../config/api'
import { $authApi } from './index'

const createTask = async (data) => {
    const response = await $authApi.post(apiRoutes.TASK_CREATE, data)
    return response?.data
}

const getTasks = async (data) => {
    const response = await $authApi.get(apiRoutes.TASK_GET_ALL, { params: data })
    return response?.data
}

export { createTask, getTasks }
