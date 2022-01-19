import { Bet, defaultValuesBet } from "@core/assets/interfaces/Bets/interfaces";

import { createSlice } from "@reduxjs/toolkit";

const initialStateLogin: Bet = defaultValuesBet;

export const betSlice = createSlice({
  name: "bet",
  initialState: initialStateLogin,
  reducers: {
    addNumberInList: (state, action) => {
      state.numbers.push(action.payload);
    },
    removeNumberFromList: (state, action) => {
      state.numbers.splice(state.numbers.indexOf(action.payload), 1);
    },
    completeGame: (state, action) => {
      if (state.numbers.length < action.payload.max_number) {
        while (state.numbers.length < action.payload.max_number) {
          const generateNumber = Math.ceil(
            Math.random() * action.payload.range
          );
          if (!state.numbers.includes(generateNumber)) {
            state.numbers.push(generateNumber);
          }
        }
      }
    },
    clearGame: (state) => {
      state.numbers = [];
    },
    getGameId: (state, action) => {
      state.game_id = action.payload;
    },
  },
});

export const {
  addNumberInList,
  removeNumberFromList,
  completeGame,
  clearGame,
  getGameId,
} = betSlice.actions;

export default betSlice.reducer;
