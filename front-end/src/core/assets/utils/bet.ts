export const isEqualBet = (betList: any, betItem: any) => {
  let selectedNumberGame = [...betItem.numbers].sort(
    (x: number, y: number) => x - y
  );

  let isEqual = false;
  for (let itemArray in betList) {
    let newBetList = [...betList[itemArray].numbers];
    newBetList = newBetList.sort((x: number, y: number) => x - y);

    isEqual = newBetList.every((item: number, index: number) => {
      return item === selectedNumberGame[index];
    });

    if (isEqual) {
      return isEqual;
    }
  }
  return isEqual;
};
