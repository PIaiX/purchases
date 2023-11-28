import { apiRoutes } from '../config/api'
import { $api } from './index'
import axios from 'axios';

const getReview = async () => {

    const response = await $api.get(apiRoutes.CATEGORY_ALL)
    return response?.data

}

export { getReview }
