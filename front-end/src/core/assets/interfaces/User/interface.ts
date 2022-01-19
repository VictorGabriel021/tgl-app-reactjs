export interface UserInfo {
  bets: UserBetInfo[];
  created_at: string;
  email: string;
  id: number;
  is_admin: number;
  name: string;
  picture?: string;
  token: string;
  token_created_at: string;
  updated_at: string;
}

interface UserBetInfo {
  choosen_numbers: string;
  created_at: string;
  game_id: number;
  id: number;
  price: number;
  updated_at: string;
  user_id: number;
}

export const defaultValuesUser = {
  bets: [],
  created_at: "",
  email: "",
  id: 0,
  is_admin: 0,
  name: "",
  picture: "",
  token: "",
  token_created_at: "",
  updated_at: "",
};
