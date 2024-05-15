import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api, $authApi } from ".";
import { apiRoutes } from "../config/api";
import socket from "../config/socket";
import { toggleRememberMe } from "../store/reducers/rememberMeSlice";
import { resetFavoriteSync } from "../store/reducers/favoriteSlice";
import { clearNotification } from "../store/reducers/notificationSlice";
// import socket from "../config/socket";

const login = createAsyncThunk("auth/login", async (payloads, thunkAPI) => {
  try {
    const response = await $api.post(apiRoutes.AUTH_LOGIN, payloads);
    if (response?.data) {
      socket.io.opts.query = { userId: response?.data?.user?.id }
      socket.disconnect().connect()
      sessionStorage.setItem('myKey', 'myValue');
    }
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  socket.io.opts.query = false
  socket.disconnect()
  try {
    const response = await $authApi.post(apiRoutes.AUTH_LOGOUT);
    thunkAPI.dispatch(toggleRememberMe(false));
    thunkAPI.dispatch(resetFavoriteSync());
    thunkAPI.dispatch(clearNotification());
    socket.connect()
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const checkAuth = async () => {
  const response = await $authApi.post(apiRoutes.AUTH_CHECK);
  if (response?.data) {
    socket.io.opts.query = { userId: response?.data?.id }
    socket.disconnect().connect()
  }
  return response?.data;
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
  const response = await $api.post(apiRoutes.AUTH_REGISTRATION, params);
  return response?.data;
};

const authActivate = async (key) => {
  const response = await $authApi.post(apiRoutes.AUTH_ACTIVATE, { key });
  return response?.data;
};

const authActivateEmail = async (key) => {
  const response = await $api.post(apiRoutes.AUTH_ACTIVATE_EMAIL, { key });
  return response?.data;
};

const authEditPhone = async (data) => {
  const response = await $authApi.post(apiRoutes.AUTH_EDIT_PHONE, data);
  return response?.data;
};

const authEditPassword = async (params) => {
  const response = await $authApi.post(apiRoutes.AUTH_EDIT_PASSWORD, params);
  return response?.data;
};

const authNewKeyActivate = async (params) => {
  const response = await $authApi.post(apiRoutes.AUTH_NEW_KEY_ACTIVATE, params);
  return response?.data;
};

const authPasswordRecovery = async (params) => {
  const response = await $api.post(apiRoutes.AUTH_RECOVERY, params);
  return response?.data;
};

const authEditEmail = async (data) => {
  const response = await $authApi.post(apiRoutes.AUTH_EDIT_EMAIL, data);
  return response?.data;
};

export {
  authActivate,
  authActivateEmail,
  authEditEmail,
  authNewKeyActivate,
  authEditPassword,
  authEditPhone,
  authPasswordRecovery,
  authRegister,
  checkAuth,
  login,
  logout,
  refreshAuth,
};
