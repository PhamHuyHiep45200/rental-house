import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slide/user.slide";
import commonReducer from "./slide/common.slide";
import authReduceer from "./slide/auth.slide";
import { rtkQueryApi } from "@/service/rtk-query";

export const makeStore = () => {
  return configureStore({
    reducer: {
      commonSlice: commonReducer,
      userSlice: userReducer,
      authSlice: authReduceer,
      [rtkQueryApi.reducerPath]: rtkQueryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rtkQueryApi.middleware),
  });
};
