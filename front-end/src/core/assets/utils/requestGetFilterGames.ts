import { makeRequest } from "@core/assets/utils/request";

export async function getFilterGames() {
  try {
    const response = await makeRequest({ url: "/cart_games" });
    return response.data;
  } catch (error: any) {}
}
