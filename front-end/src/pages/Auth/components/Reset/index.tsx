import { Form, Input, Label, TextCenter, ErrorMessage } from "../styles";
import Card from "../../../../core/components/Card";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { makeRequest } from "../../../../core/assets/utils/request";
import { useHistory } from "react-router-dom";
import { AuthCard } from "../../../../core/assets/types/types";
import BtnSumbit from "../../../../core/components/ButtonSubmit";

interface IFormInput {
  email: string;
}

const Reset = ({ title, textButton, textRedirect }: AuthCard) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const history = useHistory();

  const onSubmit = async (dataForm: IFormInput) => {
    try {
      await makeRequest({
        url: "/reset",
        method: "POST",
        data: dataForm,
        headers: {
          "Content-Type": "application/json",
        },
      });
      history.push("/");
    } catch (error: any) {
      let errorMessage = "Network Error";
      if (error.message === "Request failed with status code 404") {
        errorMessage = "User not found !";
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
      arrowLeft={true}
      urlRedirect="/"
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
        <TextCenter>
          <BtnSumbit textButton={textButton} />
        </TextCenter>
      </Form>
    </Card>
  );
};

export default Reset;
