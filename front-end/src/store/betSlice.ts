import { createSlice } from "@reduxjs/toolkit";
import { Bet } from "../core/assets/types/types";

const initialStateLogin: Bet = {
  game_id: 0,
  numbers: [],
};

export const betSlice = createSlice({
  name: "bet",
  initialState: initialStateLogin,
  reducers: {
    addNumberInList: (state, action) => {
      if (!state.numbers.includes(action.payload.item)) {
        if (action.payload.maxNumbers > state.numbers.length) {
          state.numbers.push(action.payload.item);
        } else {
          window.alert(
            `Você já selecionou ${action.payload.maxNumbers} números!`
          );
        }
      } else {
        state.numbers.splice(state.numbers.indexOf(action.payload.item), 1);
      }
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

export const { addNumberInList, completeGame, clearGame, getGameId } =
  betSlice.actions;

export default betSlice.reducer;
