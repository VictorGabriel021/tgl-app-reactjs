import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeRequest } from "@core/assets/utils/request";
import { AuthCard } from "@core/assets/interfaces/interfaces";
import Card from "@core/components/Card";
import { login } from "@store/authSlice";
import BtnSumbit from "@core/components/ButtonSubmit";
import { ErrorMessage, Input, Label, TextCenter } from "../styles";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Register = ({ title, textButton, textRedirect }: AuthCard) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (dataForm: IFormInput) => {
    try {
      const response = await makeRequest({
        url: "/user/create",
        method: "POST",
        data: dataForm,
      });
      dispatch(login(response.data));
      history.push("/lottery");
    } catch (error: any) {
      setError("email", {
        type: "validate",
        message: "Email já existe !",
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
        <Label>Name *</Label>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <Input
          type="text"
          {...register("name", {
            required: "Este campo é obrigatório",
            minLength: { value: 4, message: "Deve ter no mínimo 4 caracteres" },
          })}
        />
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
        <TextCenter>
          <BtnSumbit textButton={textButton} />
        </TextCenter>
      </form>
    </Card>
  );
};

export default Register;
