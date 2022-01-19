export interface GameInfo {
  id: number;
  type: string;
  description: string;
  range: number;
  price: number;
  max_number: number;
  color: string;
}

export interface GamesList {
  id: number;
  user_id: number;
  game_id: number;
  choosen_numbers: string;
  price: number;
  created_at: string;
  type: {
    id: number;
    type: string;
  };
}

export interface GameFilter {
  min_cart_value: number;
  types: GameInfo[];
}

export const defaultValuesGameInfo = {
  id: 0,
  type: "",
  description: "",
  range: 0,
  price: 0,
  max_number: 0,
  color: "",
};

export const defaultValuesGameFilter = {
  min_cart_value: 0,
  types: [],
};
