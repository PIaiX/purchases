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

const authRegister = async (params) => {
  const data = await $api.post(apiRoutes.AUTH_REGISTRATION, params);
  return data;
};

const authActivate = async (key) => {
  const data = await $api.post(apiRoutes.AUTH_ACTIVATE, { key });
  return data;
};

const authActivatePhone = async (params) => {
  const data = await $authApi.post(apiRoutes.AUTH_ACTIVATE_PHONE, params);
  return data;
};

const authEditPassword = async (params) => {
  const data = await $authApi.post(apiRoutes.AUTH_EDIT_PASSWORD, params);
  return data;
};

const authNewKeyActivate = async (params) => {
  const data = await $authApi.post(apiRoutes.AUTH_NEW_KEY_ACTIVATE, params);
  return data;
};

const authPasswordRecovery = async (params) => {
  const data = await $api.post(apiRoutes.AUTH_RECOVERY, params);
  return data;
};

const authEditEmail = async (params) => {
  const data = await $authApi.post(apiRoutes.AUTH_EDIT_EMAIL, params);
  return data;
};

export {
  authActivate,
  authEditEmail,
  authNewKeyActivate,
  authEditPassword,
  authActivatePhone,
  authPasswordRecovery,
  authRegister,
  checkAuth,
  login,
  logout,
  refreshAuth,
};
