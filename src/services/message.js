import { $authApi } from ".";
import { apiRoutes } from "../config/api";

const getDialogs = async (data) => {
  const response = await $authApi.get(apiRoutes.DIALOGS, {
    params: data,
  });
  return response?.data;
};

const getMessages = async (data) => {
  const response = await $authApi.get(apiRoutes.MESSAGES, {
    params: data,
  });

  return response?.data;
};

const getMessage = async (id) => {
  const response = await $authApi.get(apiRoutes.MESSAGES, {
    params: { id },
  });

  return response?.data;
};

const createMessage = async (data) => {
  const response = await $authApi.post(apiRoutes.MESSAGES, data);
  return response?.data;
};

const viewMessages = async (data) => {
  const response = await $authApi.put(apiRoutes.MESSAGES, data);
  return response?.data;
};

const editMessage = async (data) => {
  const response = await $authApi.put(apiRoutes.MESSAGES, data);
  return response?.data;
};

const deleteMessage = async (ids) => {
  const response = await $authApi.delete(apiRoutes.MESSAGES, {
    data: { ids },
  });
  return response?.data;
};

export {
  getDialogs,
  getMessages,
  getMessage,
  createMessage,
  editMessage,
  deleteMessage,
  viewMessages
};
