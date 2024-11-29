import { $authApi } from './index';
import { apiRoutes } from '../config/api';

const getBlackList = async (data) => {
    const response = await $authApi.get(apiRoutes.BLACKLIST, data);
    return response?.data;
};

const editBlackList = async (data) => {
    const response = await $authApi.put(apiRoutes.BLACKLIST, data);
    return response?.data;
};

export { getBlackList, editBlackList };
