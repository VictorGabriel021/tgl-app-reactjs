import { makeRequest } from "../axios.config";

export const listGames = async () => {
  try {
    const response = await makeRequest({ url: "/cart_games" });
    return response.data;
  } catch (error: any) {}
};
