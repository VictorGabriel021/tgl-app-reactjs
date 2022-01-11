import { HiOutlineArrowRight } from "react-icons/hi";
import { ButtonSubmit } from "../styles";

type Props = {
  textButton: string;
};

const BtnSumbit = ({ textButton }: Props) => {
  return (
    <ButtonSubmit>
      {textButton} <HiOutlineArrowRight />
    </ButtonSubmit>
  );
};

export default BtnSumbit;
