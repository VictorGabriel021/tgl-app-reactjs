import { Bet } from "@core/assets/interfaces/interfaces";
import { makeRequest } from "../axios.config";

export const newBet = async (token: string, games: Bet[]) => {
  try {
    const response = await makeRequest({
      method: "POST",
      url: "/bet/new-bet",
      data: { games: games },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {}
};
