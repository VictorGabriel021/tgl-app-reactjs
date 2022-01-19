import { IFormLogin } from "@core/assets/interfaces/AuthForms/interfaces";
import { makeRequest } from "../axios.config";

export const loginUser = async (dataForm: IFormLogin) => {
  try {
    const response = await makeRequest({
      url: "/login",
      method: "POST",
      data: dataForm,
    });
    return response.data;
  } catch (error: any) {}
};
