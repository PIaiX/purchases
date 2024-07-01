import { apiRoutes } from '../config/api'
import { $api } from './index'


const getGeneralHome = async () => {
    const response = await $api.get(apiRoutes.GENERAL_HOME)
    return response?.data
}
export { getGeneralHome }
