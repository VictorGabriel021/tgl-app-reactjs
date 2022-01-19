import { createSlice } from "@reduxjs/toolkit";

import { getAuthData, isAuthenticated } from "@core/assets/utils/auth";

import { UserLogin } from "@core/assets/interfaces/Auth/interfaces";

const userAuthenticated = getAuthData();
const isAuth = isAuthenticated();
const initialStateLogin: UserLogin = {
  user: userAuthenticated.user,
  token: userAuthenticated.token,
  isAuthenticated: isAuth,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateLogin,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("login", JSON.stringify(state));
    },
    logout: (state) => {
      const userAuth = { user: {}, token: {} } as UserLogin;
      state.user = userAuth.user;
      state.token = userAuth.token;
      state.isAuthenticated = false;
      localStorage.removeItem("login");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
