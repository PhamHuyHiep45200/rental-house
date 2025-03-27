import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  user: null,
  infoAccout: null,
  favorite: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setUser: (state, acction) => {
      state.user = acction.payload;
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
