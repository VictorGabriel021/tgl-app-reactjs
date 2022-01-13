import { toast } from "react-toastify";
import { makeRequest } from "../../../core/assets/utils/request";

export async function getFilterGames() {
  try {
    const response = await makeRequest({ url: "/cart_games" });
    return response.data;
  } catch (error: any) {
    let errorMessage = "Network Error";
    if (error.message === "Request failed with status code 404") {
      errorMessage = "Filter not found !";
    }
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}
