import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { makeRequest } from "../../../../../core/assets/utils/request";
import BtnSumbit from "../../../../../core/components/ButtonSubmit";
import Card from "../../../../../core/components/Card";
import { TextCenter } from "../../../styles";
import { ErrorMessage, Form, Input, Label } from "../../styles";

interface IFormInput {
  password: string;
  confirmPassword: string;
}

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
  } = useForm<IFormInput>();

  const onSubmit = async (dataForm: IFormInput) => {
    if (dataForm.password === dataForm.confirmPassword) {
      try {
        await makeRequest({
          url: `/reset/${resetToken}`,
          method: "POST",
          data: { password: dataForm.password },
        });
        history.push("/");
        toast.success("Senha alterada !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error: any) {}
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
      urlRedirect="/"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Nova Senha *</Label>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Input
          type="password"
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
          {...register("confirmPassword", {
            required: "Este campo é obrigatório",
            minLength: { value: 4, message: "Deve ter no mínimo 4 caracteres" },
          })}
        />
        <TextCenter>
          <BtnSumbit textButton="Confirm" />
        </TextCenter>
      </Form>
    </Card>
  );
};

export default ChangePassword;
