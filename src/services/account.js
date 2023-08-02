import {createAsyncThunk} from '@reduxjs/toolkit'
import {$authApi} from '.'
import {showMessage} from '../components/ui/dialog'
import {apiRoutes} from '../config/api'
import {setAddress, mainAddressEdit, updateAddress, deleteAddressSlice} from '../store/reducers/addressSlice'
import {setUser} from '../store/reducers/authSlice'

const editAccount = createAsyncThunk('user/edit', async (payloads, thunkAPI) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT, payloads)
        if (response && response.status === 200 && response.data.user) {
            thunkAPI.dispatch(setUser(response.data.user))
            showMessage({
                message: 'Изменения успешно сохранены',
                type: 'success',
            })
        }
    } catch (err) {
        showMessage({
            message: err?.response?.data?.error ?? 'Ошибка в запросе',
            type: 'danger',
        })
    }
})

const getAddresses = async (page, limit) => {
    const response = await $authApi.get(apiRoutes.ACCOUNT_ADDRESSES_GET, {params: {page, limit}})
    if (response && response.status === 200) {
        return response.data
    }
}

const getAddress = async (addressId) => {
    if (!addressId) {
        return false
    }
    const response = await $authApi.get(apiRoutes.ACCOUNT_ADDRESS_GET, {params: {addressId}})
    if (response && response.status === 200) {
        return response.data
    }
}

const mainAddress = createAsyncThunk('address/main', async (payloads, thunkAPI) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_ADDRESS_MAIN, payloads)
        if (response && response.status === 200) {
            thunkAPI.dispatch(mainAddressEdit(response.data.address))
            return response.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const editAddress = createAsyncThunk('address/edit', async (payloads, thunkAPI) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_ADDRESS_EDIT, payloads)
        if (response && response.status === 200) {
            thunkAPI.dispatch(updateAddress(payloads))
            showMessage({
                message: 'Изменения успешно сохранены',
                type: 'success',
            })

            return response.data
        }
    } catch (err) {
        showMessage({
            message: err?.response?.data?.message?.text ?? 'Ошибка в запросе',
            type: 'danger',
        })
    }
})
const deleteAddress = createAsyncThunk('address/delete', async (addressId, thunkAPI) => {
    try {
        const response = await $authApi.delete(apiRoutes.ACCOUNT_ADDRESS_DELETE, {data: {addressId}})
        if (response) {
            thunkAPI.dispatch(deleteAddressSlice(addressId))
            showMessage({
                message: 'Адрес успешно удален',
                type: 'success',
            })
            return response.data
        }
    } catch (err) {
        showMessage({
            message: err?.response?.data?.message?.text ?? 'Ошибка в запросе',
            type: 'danger',
        })
    }
})

const createAddress = createAsyncThunk('address/create', async (payloads, thunkAPI) => {
    try {
        const response = await $authApi.post(apiRoutes.ACCOUNT_ADDRESS_CREATE, payloads)

        if (response && response.status === 200) {
            thunkAPI.dispatch(setAddress(response.data.address))
            return response.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const getOrders = async (page, limit) => {
    const response = await $authApi.get(apiRoutes.ACCOUNT_ORDERS_GET, {params: {page, limit}})
    return response?.data
}

const getOrder = async (orderId) => {
    if (!orderId) {
        return false
    }
    const response = await $authApi.get(apiRoutes.ACCOUNT_ORDER_GET, {params: {orderId}})
    if (response) {
        return response.data
    }
}

const getNotifications = async (page, limit) => {
    const response = await $authApi.get(apiRoutes.ACCOUNT_NOTIFICATIONS_GET, {params: {page, limit}})
    if (response) {
        return response.data
    }
}

const deleteNotification = async (notificationId) => {
    const response = await $authApi.delete(apiRoutes.ACCOUNT_NOTIFICATION_DELETE, {data: {notificationId}})
    if (response) {
        return response.data
    }
}

const deleteAccount = async (data) => {
    const response = await $authApi.post(apiRoutes.ACCOUNT_DELETE, data)
    if (response) {
        return response.data
    }
}

const savePushToken = async (token) => {
    const response = await $authApi.post(apiRoutes.ACCOUNT_SAVE_PUSHTOKEN, {token})
    if (response) {
        return response.data
    }
}

export {
    savePushToken,
    editAccount,
    getAddresses,
    getAddress,
    editAddress,
    mainAddress,
    createAddress,
    getOrders,
    getOrder,
    getNotifications,
    deleteAddress,
    deleteNotification,
    deleteAccount,
}
