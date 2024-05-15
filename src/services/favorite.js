import { createAsyncThunk } from '@reduxjs/toolkit';
import { $authApi } from './index';
import { apiRoutes } from '../config/api';
import { resetFavoriteSync, toggleFavoriteSync, updateFavoriteAll } from '../store/reducers/favoriteSlice';

const getFavorites = createAsyncThunk('favorite/getFavorites', async (payloads, thunkAPI) => {
    const isAuth = thunkAPI.getState()?.auth?.isAuth;

    if (isAuth) {
        try {
            const response = await $authApi.get(apiRoutes.FAVORITES, { params: payloads });
            if (response?.data?.items && response?.data?.items?.length > 0) {
                thunkAPI.dispatch(updateFavoriteAll(response.data.items));
            }
            else {
                thunkAPI.dispatch(resetFavoriteSync());
            }
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
});

const toggleFavorite = createAsyncThunk('favorite/toggleFavorite', async (payloads, thunkAPI) => {
    const isAuth = thunkAPI.getState()?.auth?.isAuth;


    if (isAuth) {
        try {
            const response = await $authApi.put(apiRoutes.FAVORITES, payloads);
            thunkAPI.dispatch(getFavorites());
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
});

export { getFavorites, toggleFavorite };
