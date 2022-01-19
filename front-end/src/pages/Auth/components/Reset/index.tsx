import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input, Label, TextCenter, ErrorMessage } from "../styles";

import { BtnSumbit, Card } from "@core/components";

import { IFormReset } from "@core/assets/interfaces/AuthForms/interfaces";
import { AuthCard } from "@core/assets/interfaces/AuthCard/interfaces";

import { resetPassword } from "@core/assets/services/Auth/ResetPassword";

import ChangePassword from "./ChangePassword";

const Reset = ({ title, textButton, textRedirect }: AuthCard) => {
  const [resetToken, setResetToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormReset>();

  const onSubmit = async (dataForm: IFormReset) => {
    const response = await resetPassword(dataForm);
    if (!!response) {
      setResetToken(response.token);
    }
  };

  if (resetToken.length > 0) {
    return (
      <ChangePassword
        title={title}
        textRedirect={textRedirect}
        resetToken={resetToken}
      />
    );
  }

  return (
    <Card
      title={title}
      textRedirect={textRedirect}
      arrowLeft={true}
      urlRedirect="../"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Email *</Label>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <Input
          type="email"
          {...register("email", {
            required: "Este campo é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        <TextCenter>
          <BtnSumbit textButton={textButton} />
        </TextCenter>
      </form>
    </Card>
  );
};

export default Reset;
