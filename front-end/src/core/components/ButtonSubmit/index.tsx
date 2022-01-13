import { HiOutlineArrowRight } from "react-icons/hi";
import { ButtonSubmit } from "./styles";

type Props = {
  textButton: string;
  className?: string;
};

const BtnSumbit = ({ className, textButton }: Props) => {
  return (
    <ButtonSubmit className={className}>
      {textButton} <HiOutlineArrowRight />
    </ButtonSubmit>
  );
};

export default BtnSumbit;
