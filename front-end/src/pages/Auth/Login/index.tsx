import { Card } from "../../../core/components/Card/styles";
import { TextSubtitle, TextParagrath, ButtonSubmit, Form, Input, Label } from "./styles";
import { HiOutlineArrowRight } from "react-icons/hi";

type Props = {
  title: string;
  textButton: string;
  textRedirect: string;
};

const Login = ({ title, textButton, textRedirect }: Props) => {
  return (
    <>
      <TextSubtitle>{title}</TextSubtitle>
      <Card>
        <Form>
          <Label>Email</Label>
          <Input type="text" />
          <Label>Password</Label>
          <Input type="password" />
          <TextParagrath>I forget my password</TextParagrath>
          <ButtonSubmit>
            {textButton} <HiOutlineArrowRight />
          </ButtonSubmit>
        </Form>
      </Card>
      <TextSubtitle>
        {textRedirect} <HiOutlineArrowRight />
      </TextSubtitle>
    </>
  );
};

export default Login;
