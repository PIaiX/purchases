import { apiRoutes } from '../config/api'
import { $authApi } from './index'

const editReserve = async (data) => {
    const response = await $authApi.post(apiRoutes.RESERVE, { value: data });
    return response?.data;
};

export { editReserve }
