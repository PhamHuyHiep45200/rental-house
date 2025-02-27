import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slide/user.slide";
import commonReducer from "./slide/common.slide";
import authReduceer from "./slide/auth.slide";
import { userQuery } from "./service/user.service";
import { createWrapper } from "next-redux-wrapper";

export const makeStore = () => {
  return configureStore({
    reducer: {
      commonSlice: commonReducer,
      userSlice: userReducer,
      authSlice: authReduceer,
      [userQuery.reducerPath]: userQuery.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userQuery.middleware),
  });
};

export const wrapper = createWrapper<any>(makeStore, {
  debug: true,
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});