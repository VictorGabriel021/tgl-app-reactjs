import {
  TextParagrath,
  Input,
  Label,
  TextCenter,
  ErrorMessage,
} from "../styles";
import Card from "@core/components/Card";
import { useForm } from "react-hook-form";
import { makeRequest } from "@core/assets/utils/request";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@store/authSlice";
import { AuthCard } from "@core/assets/interfaces/interfaces";
import BtnSumbit from "@core/components/ButtonSubmit";

interface IFormInput {
  email: string;
  password: string;
}

const Login = ({ title, textButton, textRedirect }: AuthCard) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (dataForm: IFormInput) => {
    try {
      const response = await makeRequest({
        url: "/login",
        method: "POST",
        data: dataForm,
      });
      dispatch(login(response.data));
      history.push("/lottery");
    } catch (error: any) {}
  };

  return (
    <Card
      title={title}
      textRedirect={textRedirect}
      arrowLeft={false}
      urlRedirect="/auth/register"
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
        <Label>Password *</Label>
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
        <TextParagrath>
          <Link to={"/auth/reset"}>I forget my password</Link>
        </TextParagrath>
        <TextCenter>
          <BtnSumbit textButton={textButton} />
        </TextCenter>
      </form>
    </Card>
  );
};

export default Login;
