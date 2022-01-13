export type AuthCard = {
  title: string;
  textButton: string;
  textRedirect: string;
};

export type GameFilter = {
  min_cart_value: number;
  types: [
    {
      id: number;
      type: string;
      description: string;
      range: number;
      price: number;
      max_number: number;
      color: string;
    }
  ] | [];
};

export type GamesList = {
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
};