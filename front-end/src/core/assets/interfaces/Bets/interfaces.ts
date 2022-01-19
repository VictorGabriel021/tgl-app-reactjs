export interface Bet {
  id?: number;
  game_id: number;
  numbers: number[];
}

export interface BetList {
  games: Bet[];
  totalCart: number;
}

export const defaultValuesBet = {
  game_id: 0,
  numbers: [],
};

export const defaultValuesBetList = {
  games: [],
  totalCart: 0,
};
