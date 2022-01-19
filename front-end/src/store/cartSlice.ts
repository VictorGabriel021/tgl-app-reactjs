import { createSlice } from "@reduxjs/toolkit";

import {
  BetList,
  defaultValuesBetList,
} from "@core/assets/interfaces/Bets/interfaces";

const initialStateLogin: BetList = defaultValuesBetList;

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateLogin,
  reducers: {
    addToCart: (state, action) => {
      state.games.push(action.payload.betItem);
      state.totalCart += action.payload.selectedGame.price;
    },
    removeFromCart: (state, action) => {
      const index = state.games.findIndex(
        (item) => item.id === action.payload.id
      );
      state.games.splice(index, 1);
      state.totalCart -= action.payload.price;
    },
    clearCart: (state) => {
      state.games = [];
      state.totalCart = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
