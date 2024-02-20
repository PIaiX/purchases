import axios from "axios";

import { createApi } from "@reduxjs/toolkit/query/react";
import { ClientJS } from "clientjs";
import store from "..";
import { BASE_URL, apiRoutes } from "../../config/api";

const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const client = new ClientJS();
const browser = client.getBrowserData();
const language = client.getLanguage();

const DEVICE = JSON.stringify({
    brand: browser.browser.name ?? "",
    osName: browser.os.name ?? "",
    osVersion: browser.os.version ?? "",
    language: language ?? "ru-RU",
});

$api.interceptors.request.use(
    async (config) => {
        // config.headers["Content-Type"] = "application/json";
        const state = store.getState();
        config.headers.device = DEVICE;
        config.headers.ip = state?.settings?.ip ?? "0.0.0.0";
        return config;
    },
    (error) => Promise.reject(error)
);

export const homeQuery = createApi({
    reducerPath: "homeQuery",
    baseQuery: $api,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    keepUnusedDataFor: 350,
    endpoints: (build) => ({
        getArticles: build.query({
            query: () => apiRoutes.ARTICLES,
        }),
        getRecommends: build.query({
            query: () => apiRoutes.RECOMMENDS,
        }),
        getGames: build.query({
            query: () => apiRoutes.CATEGORIES,
        }),
        getSales: build.query({
            query: () => apiRoutes.SALES,
        }),

    }),
});

export const { useGetArticlesQuery, useGetRecommendsQuery, useGetSalesQuery, useGetGamesQuery } = homeQuery;