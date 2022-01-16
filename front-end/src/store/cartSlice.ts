import { createSlice } from "@reduxjs/toolkit";
import { Bet } from "../core/assets/types/types";

type BetList = {
  games: Bet[];
  totalCart: number;
};

const initialStateLogin: BetList = {
  games: [],
  totalCart: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateLogin,
  reducers: {
    addToCart: (state, action) => {
      state.games.push(action.payload.betItem);
      state.totalCart += action.payload.selectedGame.price;
    },
    removeToCart: (state, action) => {
      state.games.splice(action.payload.id, 1);
      state.totalCart -= action.payload.price;
    },
  },
});

export const { addToCart, removeToCart } = cartSlice.actions;

export default cartSlice.reducer;
