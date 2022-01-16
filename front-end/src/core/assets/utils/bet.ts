import { Bet } from "../types/types";

export const isEqualBet = (betList: Bet[], betItem: Bet) => {
  let selectedNumberGame = [...betItem.numbers];

  let isEqual = false;
  for (let itemArray in betList) {
    let newBetList = [...betList[itemArray].numbers];

    isEqual = newBetList.every((item: number, index: number) => {
      return item === selectedNumberGame[index];
    });

    if (isEqual) {
      return isEqual;
    }
  }
  return isEqual;
};
