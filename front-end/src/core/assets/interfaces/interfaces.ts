export interface AuthCard {
  title: string;
  textButton: string;
  textRedirect: string;
}

export interface GameFilter {
  min_cart_value: number;
  types: GameInfo[];
}

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

export interface Bet {
  id?: number;
  game_id: number;
  numbers: number[];
}

export interface BetList {
  games: Bet[];
  totalCart: number;
}

export interface UserLogin {
  user: {
    id: number;
    email: string;
    is_admin: number;
    name: string;
    token: string;
    token_created_at: string;
    created_at: string;
    updated_at: string;
    picture: string;
  };
  token: {
    type: string;
    token: string;
    expires_at: string;
  };
  isAuthenticated: boolean;
}
