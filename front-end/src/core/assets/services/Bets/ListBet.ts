import { makeRequest } from "../axios.config";

export const listBet = async (token: string, params: any) => {
  try {
    const response = await makeRequest({
      url: "/bet/all-bets",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error: any) {}
};
