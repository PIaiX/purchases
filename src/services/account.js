import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authApi } from ".";
import { apiRoutes } from "../config/api";
import { setUser } from "../store/reducers/authSlice";

const editAccount = createAsyncThunk(
  "user/edit",
  async (payloads, thunkAPI) => {
    try {
      const response = await $authApi.post(apiRoutes.ACCOUNT_EDIT, payloads);
      if (response && response.status === 200 && response.data.user) {
        thunkAPI.dispatch(setUser(response.data.user));
      }
    } catch (err) {}
  }
);

const getOrders = async (page, limit) => {
  const response = await $authApi.get(apiRoutes.ACCOUNT_ORDERS_GET, {
    params: { page, limit },
  });
  return response?.data;
};

const getOrder = async (orderId) => {
  if (!orderId) {
    return false;
  }
  const response = await $authApi.get(apiRoutes.ACCOUNT_ORDER_GET, {
    params: { orderId },
  });
  if (response) {
    return response.data;
  }
};

const getNotifications = async (page, limit) => {
  const response = await $authApi.get(apiRoutes.ACCOUNT_NOTIFICATIONS_GET, {
    params: { page, limit },
  });
  if (response) {
    return response.data;
  }
};

const deleteNotification = async (notificationId) => {
  const response = await $authApi.delete(
    apiRoutes.ACCOUNT_NOTIFICATION_DELETE,
    { data: { notificationId } }
  );
  if (response) {
    return response.data;
  }
};

const deleteAccount = async (data) => {
  const response = await $authApi.post(apiRoutes.ACCOUNT_DELETE, data);
  if (response) {
    return response.data;
  }
};

const savePushToken = async (token) => {
  const response = await $authApi.post(apiRoutes.ACCOUNT_SAVE_PUSHTOKEN, {
    token,
  });
  if (response) {
    return response.data;
  }
};

export {
  deleteAccount,
  deleteNotification,
  editAccount,
  getNotifications,
  getOrder,
  getOrders,
  savePushToken,
};
