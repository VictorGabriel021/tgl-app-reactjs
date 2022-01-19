import { IFormReset } from "@core/assets/interfaces/AuthForms/interfaces";
import { makeRequest } from "../axios.config";

export const resetPassword = async (dataForm: IFormReset) => {
  try {
    const response = await makeRequest({
      url: "/reset",
      method: "POST",
      data: dataForm,
    });
    return response.data;
  } catch (error: any) {}
};
