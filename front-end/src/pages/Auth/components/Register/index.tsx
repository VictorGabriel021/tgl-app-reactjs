import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { makeRequest } from "../../../../core/assets/utils/request";
import { AuthCard } from "../../../../core/assets/types/types";
import Card from "../../../../core/components/Card";
import { saveUserData } from "../../../../store/userLoginSlice";
import BtnSumbit from "../../../../core/components/ButtonSubmit";
import { ErrorMessage, Form, Input, Label, TextCenter } from "../styles";

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
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      dispatch(saveUserData(data));
      history.push("/lottery");
    } catch (error: any) {
      let errorMessage = "Network Error";
      if (error.message === "Request failed with status code 400") {
        errorMessage = "Email already exists !";
        setError("email", {
          type: "validate",
          message: "Email already exists !",
        });
      }
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Card title={title} textRedirect={textRedirect} arrowLeft={true} urlRedirect="/">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Name</Label>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <Input
          type="text"
          {...register("name", {
            required: "This field is required",
            minLength: { value: 4, message: "Must be at least 4 characters" },
          })}
        />
        <Label>Email</Label>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <Input
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email invalid",
            },
          })}
        />
        <Label>Password</Label>
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
        <TextCenter>
          <BtnSumbit textButton={textButton} />
        </TextCenter>
      </Form>
    </Card>
  );
};

export default Register;
