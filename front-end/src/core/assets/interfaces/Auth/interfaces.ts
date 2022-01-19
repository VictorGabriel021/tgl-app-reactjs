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
