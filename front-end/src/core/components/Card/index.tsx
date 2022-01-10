import React from "react";
import { Card } from "./styles";

type Props = {
  children: React.ReactNode;
};

const Login = ({ children }: Props) => {
  return <Card>{children}</Card>;
};

export default Login;
