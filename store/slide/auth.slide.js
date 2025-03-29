import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window !== "undefined") {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : { auth: false, user: null };
  }
  return { auth: false, user: null, infoAccount: null, favorite: 0 };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    setInfo: (state, action) => {
      state.infoAccout = action.payload;
    },
    setFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    setCheckChangeUser: (state, action) => {
      state.checkChangeUser = action.payload;
    },
    setChangeFavorite: (state, action) => {
      state.changeFavorite = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAuth,
  setUser,
  setInfo,
  setFavorite,
  setCheckChangeUser,
  setChangeFavorite,
} = authSlice.actions;

export default authSlice.reducer;
