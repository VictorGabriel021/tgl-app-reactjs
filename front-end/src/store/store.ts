import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import betReducer from "./betSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: { auth: authReducer, bet: betReducer, cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
