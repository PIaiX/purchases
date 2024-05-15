import { apiRoutes } from '../config/api'
import { $authApi } from './index'

const createTask = async (data) => {
    const response = await $authApi.postForm(apiRoutes.TASK, data)
    return response?.data
}

const getTasks = async (data) => {
    const response = await $authApi.get(apiRoutes.TASK, { params: data })
    return response?.data
}

const getTask = async (data) => {
    const response = await $authApi.get(apiRoutes.TASK_ONE, { params: data })
    return response?.data
}


export { createTask, getTask, getTasks }
