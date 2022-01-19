import { IFormUpdateMyUser } from "@core/assets/interfaces/UserForms/interfaces";
import { makeRequest } from "../axios.config";

export const updateMyUser = async (
  token: string,
  params: IFormUpdateMyUser
) => {
  try {
    const response = await makeRequest({
      method: "PUT",
      url: "/user/update",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  } catch (error: any) {}
};
