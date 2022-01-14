import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLoginSlice";
import betReducer from "./betSlice";

export const store = configureStore({
  reducer: { userLogin: userLoginReducer, bet: betReducer },
});

export type RootState = ReturnType<typeof store.getState>;
