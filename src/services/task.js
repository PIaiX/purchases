import { apiRoutes } from '../config/api'
import { $api, $authApi } from './index'

const createTask = async (data) => {
    const response = await $authApi.postForm(apiRoutes.TASK, data)
    return response?.data
}
const createTaskEmail = async (data) => {
    const response = await $api.postForm(apiRoutes.TASK_EMAIL, data)
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


export { createTask, getTask, getTasks, createTaskEmail }
