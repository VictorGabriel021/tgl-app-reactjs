import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLoginSlice";
import betReducer from "./betSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: { userLogin: userLoginReducer, bet: betReducer, cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;
