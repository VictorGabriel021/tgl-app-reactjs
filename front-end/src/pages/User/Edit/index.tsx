import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { Form, ErrorMessage } from "./styles";

import { IFormUpdateMyUser } from "@core/assets/interfaces/UserForms/interfaces";

import { updateMyUser } from "@core/assets/services/User/UpdateMyUser";

import { updateUser } from "@store/authSlice";
import { RootState } from "@store/store";

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
  } = useForm<IFormUpdateMyUser>();

  const editHandler = async (params: IFormUpdateMyUser) => {
    const response = await updateMyUser(token, params);
    if (!!response) {
      dispatch(updateUser(response));
      toast.success("Usuário alterado com sucesso !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      history.push("/user");
    }
  };

  useEffect(() => {
    setValue("email", email);
    setValue("name", name);
  }, [email, name, setValue]);

  return (
    <div className="d-flex justify-content-center">
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
    </div>
  );
};

export default UserEdit;
