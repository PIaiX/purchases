import { $api, $authApi } from ".";
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
  const formData = new FormData();
  if (data.media) {
    formData.append(`file`, data.media[0]);
  }
  if (data.id) {
    formData.append('id', data.id);
  }
  else {
    formData.append('fromId', data.fromId);
    formData.append('toId', data.toId);
  }
  if (data.text) {
    formData.append('text', data?.text);
  }

  const response = await $authApi.post(apiRoutes.MESSAGES, formData);
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


// MESSAGES_GENERAL


const getMessagesGeneral = async (data) => {
  const response = await $api.get(apiRoutes.MESSAGES_GENERAL, {
    params: data,
  });

  return response?.data;
};

const getMessageGeneral = async (id) => {
  const response = await $api.get(apiRoutes.MESSAGES_GENERAL, {
    params: { id },
  });

  return response?.data;
};

const createMessageGeneral = async (data) => {
  const response = await $authApi.post(apiRoutes.MESSAGES_GENERAL, data);
  return response?.data;
};

const viewMessageGeneral = async (data) => {
  const response = await $authApi.put(apiRoutes.MESSAGES_GENERAL, data);
  return response?.data;
};

const editMessageGeneral = async (data) => {
  const response = await $authApi.put(apiRoutes.MESSAGES_GENERAL, data);
  return response?.data;
};

const deleteMessageGeneral = async (ids) => {
  const response = await $authApi.delete(apiRoutes.MESSAGES_GENERAL, {
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
  viewMessages,
  getMessagesGeneral,
  getMessageGeneral,
  createMessageGeneral,
  viewMessageGeneral,
  editMessageGeneral,
  deleteMessageGeneral
};
