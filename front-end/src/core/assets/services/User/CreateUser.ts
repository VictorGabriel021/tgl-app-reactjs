import { IFormRegister } from "@core/assets/interfaces/UserForms/interfaces";
import { makeRequest } from "../axios.config";

export const createUser = async (dataForm: IFormRegister) => {
  try {
    const response = await makeRequest({
      url: "/user/create",
      method: "POST",
      data: dataForm,
    });
    return response.data;
  } catch (error: any) {}
};
