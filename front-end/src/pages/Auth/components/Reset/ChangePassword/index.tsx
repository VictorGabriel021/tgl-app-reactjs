import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { TextCenter } from "@pages/Auth/styles";
import { ErrorMessage, Input, Label } from "@pages/Auth/components/styles";

import { BtnSumbit, Card } from "@core/components";

import { IFormChangePassword } from "@core/assets/interfaces/AuthForms/interfaces";

import { changePassword } from "@core/assets/services/Auth/ChangePassword";

type Props = {
  title: string;
  textRedirect: string;
  resetToken: string;
};

const ChangePassword = ({ title, textRedirect, resetToken }: Props) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormChangePassword>();

  const onSubmit = async (dataForm: IFormChangePassword) => {
    if (dataForm.password === dataForm.confirmPassword) {
      const response = await changePassword(dataForm, resetToken);
      if (!!response) {
        history.push("/");
        toast.success("Senha alterada !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      setError("password", {
        type: "validate",
        message: "Senha não é igual !",
      });
      setError("confirmPassword", {
        type: "validate",
        message: "Senha não é igual !",
      });
    }
  };

  return (
    <Card
      title={title}
      textRedirect={textRedirect}
      arrowLeft={true}
      urlRedirect="../"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Nova Senha *</Label>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Input
          type="password"
          autoComplete="on"
          {...register("password", {
            required: "Este campo é obrigatório",
            minLength: { value: 4, message: "Deve ter no mínimo 4 caracteres" },
          })}
        />
        <Label>Confirmar Senha *</Label>
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
        <Input
          type="password"
          autoComplete="on"
          {...register("confirmPassword", {
            required: "Este campo é obrigatório",
            minLength: { value: 4, message: "Deve ter no mínimo 4 caracteres" },
          })}
        />
        <TextCenter>
          <BtnSumbit textButton="Confirm" />
        </TextCenter>
      </form>
    </Card>
  );
};

export default ChangePassword;
