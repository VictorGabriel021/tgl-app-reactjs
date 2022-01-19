import { makeRequest } from "../axios.config";

export const myAccount = async (token: string) => {
  try {
    const response = await makeRequest({
      url: "/user/my-account",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {}
};
