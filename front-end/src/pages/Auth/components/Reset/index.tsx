import { Input, Label, TextCenter, ErrorMessage } from "../styles";
import Card from "../../../../core/components/Card";
import { useForm } from "react-hook-form";
import { makeRequest } from "../../../../core/assets/utils/request";
import { AuthCard } from "../../../../core/assets/interfaces/interfaces";
import BtnSumbit from "../../../../core/components/ButtonSubmit";
import { useState } from "react";
import ChangePassword from "./ChangePassword";

interface IFormInput {
  email: string;
}

const Reset = ({ title, textButton, textRedirect }: AuthCard) => {
  const [resetToken, setResetToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (dataForm: IFormInput) => {
    try {
      const response = await makeRequest({
        url: "/reset",
        method: "POST",
        data: dataForm,
      });
      setResetToken(response.data.token);
    } catch (error: any) {}
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
