import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authSlice from "./reducers/authSlice";
import cartSlice from "./reducers/cartSlice";
import checkoutSlice from "./reducers/checkoutSlice";
import favoriteSlice from "./reducers/favoriteSlice";
import settingsSlice from "./reducers/settingsSlice";
import { homeQuery } from "./reducers/homeQuery";
import themeSlice from "./reducers/themeSlice"
import notificationSlice from "./reducers/notificationSlice";

const rootReducer = combineReducers({
  settings: settingsSlice,
  auth: authSlice,
  cart: cartSlice,
  favorite: favoriteSlice,
  checkout: checkoutSlice,
  notification: notificationSlice,
  theme: themeSlice,
  [homeQuery.reducerPath]: homeQuery.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["checkout", "cart", "favorite", "settings"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(homeQuery.middleware),
});
const persistor = persistStore(store);

export { persistor };
export default store;
