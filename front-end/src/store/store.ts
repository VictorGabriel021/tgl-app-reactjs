import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLoginSlice";

export const store = configureStore({
  reducer: { userLogin: userLoginReducer },
});

export type UserLoginState = ReturnType<typeof store.getState>;
