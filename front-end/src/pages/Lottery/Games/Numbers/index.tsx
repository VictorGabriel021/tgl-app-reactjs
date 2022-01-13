import { ChooiceNumber } from "./styles";

type Props = {
  numbers: number;
};

const GenerateNumbers = ({ numbers }: Props) => {
  let value = 1;
  let num: any[] = [];

  while (value <= numbers) {
    num.push(value);
    value++;
  }

  return (
    <>
      {num.map((item) => {
        if (item < 10) {
          item = "0" + item;
        }
        return <ChooiceNumber key={item}>{item}</ChooiceNumber>;
      })}
    </>
  );
};

export default GenerateNumbers;
