import { UserLogin } from "@core/assets/interfaces/interfaces";

export const getAuthData = () => {
  const userAuth = localStorage.getItem("login") || "{}";
  const parsedUserAuth = JSON.parse(userAuth);

  return parsedUserAuth as UserLogin;
};

export const isTokenValid = (dateExp: string) => {
  const date = new Date(`${dateExp}`);
  return Date.now() <= date.getTime();
};

export const isAuthenticated = () => {
  const userAuthenticated = getAuthData();
  return (
    !!userAuthenticated.token &&
    !!userAuthenticated.token.token &&
    !!isTokenValid(userAuthenticated.token.expires_at)
  );
};
