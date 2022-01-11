import {
  TextParagrath,
  ButtonSubmit,
  Form,
  Input,
  Label,
  TextCenter,
  ErrorMessage,
} from "./styles";
import { HiOutlineArrowRight } from "react-icons/hi";
import Card from "../../../core/components/Card";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { makeRequest } from "../../../core/assets/utils/request";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../../store/userLoginSlice";

type Props = {
  title: string;
  textButton: string;
  textRedirect: string;
};

interface IFormInput {
  email: string;
  password: string;
}

const Login = ({ title, textButton, textRedirect }: Props) => {
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
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      dispatch(saveUserData(data));
      history.push("/lottery");
    } catch (error: any) {
      let errorMessage = "Network Error";
      if (error.message === "Request failed with status code 401") {
        errorMessage = "Email or password invalid !";
      }
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Card
      title={title}
      textRedirect={textRedirect}
      arrowLeft={false}
      url="/auth/register"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("password", { required: "This field is required" })}
        />
        <TextParagrath>
          <Link to={"/auth/reset"}>I forget my password</Link>
        </TextParagrath>
        <TextCenter>
          <ButtonSubmit>
            {textButton} <HiOutlineArrowRight />
          </ButtonSubmit>
        </TextCenter>
      </Form>
    </Card>
  );
};

export default Login;
