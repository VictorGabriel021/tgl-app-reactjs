import { IFormChangePassword } from "@core/assets/interfaces/AuthForms/interfaces";
import { makeRequest } from "../axios.config";

export const changePassword = async (
  dataForm: IFormChangePassword,
  resetToken: string
) => {
  try {
    const response = await makeRequest({
      url: `/reset/${resetToken}`,
      method: "POST",
      data: { password: dataForm.password },
    });
    return response.data;
  } catch (error: any) {}
};
