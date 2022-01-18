import { createSlice } from "@reduxjs/toolkit";
import { BetList } from "@core/assets/interfaces/interfaces";

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
    removeFromCart: (state, action) => {
      state.games.splice(action.payload.id, 1);
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
