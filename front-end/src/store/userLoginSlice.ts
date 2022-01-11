import { createSlice } from "@reduxjs/toolkit";

export type UserLogin = {
  user:
    | {
        id: number;
        email: string;
        is_admin: number;
        name: string;
        token: string;
        token_created_at: string;
        created_at: string;
        updated_at: string;
        picture: string;
      }
    | object;
  token:
    | {
        type: string;
        token: string;
        expires_at: string;
      }
    | object;
};

let userAuthenticated: any = localStorage.getItem("login") || "{}";
userAuthenticated = JSON.parse(userAuthenticated);

const initialStateLogin: UserLogin = {
  user: userAuthenticated.user,
  token: userAuthenticated.token,
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: initialStateLogin,
  reducers: {
    saveUserData: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("login", JSON.stringify(state));
    },
  },
});

export const { saveUserData } = userLoginSlice.actions;

export default userLoginSlice.reducer;
