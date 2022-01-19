import { makeRequest } from "@core/assets/utils/request";
import { updateUser } from "@store/authSlice";
import { RootState } from "@store/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, ErrorMessage } from "./styles";

interface IFormInput {
  email: string;
  name: string;
}

const UserEdit = () => {
  const { token } = useSelector((state: RootState) => state.auth.token);
  const { email, name } = useSelector((state: RootState) => state.auth.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const editHandler = async (params: IFormInput) => {
    try {
      const response = await makeRequest({
        method: "PUT",
        url: "/user/update",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
      dispatch(updateUser(response.data));
      history.push("/user");
    } catch (error: any) {}
  };

  useEffect(() => {
    setValue("email", email);
    setValue("name", name);
  }, [email, name, setValue]);

  return (
    <Form onSubmit={handleSubmit(editHandler)}>
      <div className="d-flex justify-content-between">
        <h2>Editar Usuário</h2>
        <Link to="./">
          <p>Voltar</p>
        </Link>
      </div>
      <label className="mt-3">Name *</label>
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      <input
        className="form-control"
        type="text"
        {...register("name", {
          required: "Este campo é obrigatório",
          minLength: { value: 4, message: "Deve ter no mínimo 4 caracteres" },
        })}
      />
      <label className="mt-3">Email *</label>
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      <input
        className="form-control"
        type="email"
        {...register("email", {
          required: "Este campo é obrigatório",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido",
          },
        })}
      />
      <button className="btn btn-primary mt-3 w-100">Editar</button>
    </Form>
  );
};

export default UserEdit;
