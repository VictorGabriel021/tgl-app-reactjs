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
          headers: {
            "Content-Type": "application/json",
          },
        });
        history.push("/");
        toast.success("Senha alterada !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error: any) {
        let errorMessage = "Network Error";
        if (error.message === "Request failed with status code 404") {
          errorMessage = "User not found !";
        }
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    setError("password", {
      type: "validate",
      message: "Password not equal !",
    });
    setError("confirmPassword", {
      type: "validate",
      message: "Password not equal !",
    });
  };

  return (
    <Card
      title={title}
      textRedirect={textRedirect}
      arrowLeft={true}
      urlRedirect="/"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Nova Senha</Label>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <Input
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 4, message: "Must be at least 4 characters" },
          })}
        />
        <Label>Confirmar Senha</Label>
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "This field is required",
            minLength: { value: 4, message: "Must be at least 4 characters" },
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
