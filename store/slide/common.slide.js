import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  popupChat: false,
  message: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    openChat: (state) => {
      state.popupChat = true;
    },
    closeChat: (state) => {
      state.popupChat = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, stopLoading, openChat, closeChat, setMessage } =
  commonSlice.actions;

export default commonSlice.reducer;
