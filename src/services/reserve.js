import { apiRoutes } from '../config/api'
import { $authApi } from './index'

const editReserve = async (data) => {
    const response = await $authApi.post(apiRoutes.RESERVE, data);
    return response?.data;
};

export { editReserve }
