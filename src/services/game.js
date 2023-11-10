import { apiRoutes } from '../config/api'
import { $api } from './index'
import axios from 'axios';

const getGames = async () => {

    const response = await $api.get(apiRoutes.CATEGORY_ALL)
    return response?.data

}

export { getGames }
