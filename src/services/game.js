import { apiRoutes } from '../config/api'
import { $api, $authApi } from './index'
import axios from 'axios';

const getGames = async () => {

    const response = await $api.get(apiRoutes.CATEGORIES)
    return response?.data

}
const getGamesList = async () => {

    const response = await $api.get(apiRoutes.CATEGORIESLIST)
    return response?.data

}
const getUserGame = async (data) => {

    const response = await $authApi.get(apiRoutes.USER_CATEGORY, { params: data })
    return response?.data

}
const getGame = async (data) => {

    const response = await $api.get(apiRoutes.CATEGORY, { params: data })
    return response?.data

}

export { getGames, getGame, getGamesList, getUserGame }
