import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api, $authApi } from ".";
import { apiRoutes } from "../config/api";
// import socket from "../config/socket";

const login = createAsyncThunk("auth/login", async (payloads, thunkAPI) => {
  try {
    const response = await $api.post(apiRoutes.AUTH_LOGIN, payloads);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await $api.post(apiRoutes.AUTH_LOGOUT);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const checkAuth = async () => {
  const response = await $authApi.post(apiRoutes.AUTH_CHECK);
  return response.data;
};

const refreshAuth = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const response = await $authApi.post(apiRoutes.AUTH_REFRESH);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authRegister = async (payloads = {}) => {
  const data = await $api.post(apiRoutes.AUTH_REGISTRATION, payloads);
  return data;
};

const authActivate = async (payloads = {}) => {
  const data = await $authApi.post(apiRoutes.AUTH_ACTIVATE, payloads);
  return data;
};

const authNewKeyActivate = async () => {
  const data = await $authApi.post(apiRoutes.AUTH_NEW_KEY_ACTIVATE, payloads);
  return data;
};

const authPasswordRecovery = async (payloads = {}) => {
  const data = await $api.post(apiRoutes.AUTH_RECOVERY, payloads);
  return data;
};

const authEditEmail = async (payloads = {}) => {
  const data = await $authApi.post(apiRoutes.AUTH_EDIT_EMAIL, payloads);
  return data;
};

export {
  authActivate,
  authEditEmail,
  authNewKeyActivate,
  authPasswordRecovery,
  authRegister,
  checkAuth,
  login,
  logout,
  refreshAuth,
};
