import { useDispatch, useSelector } from "react-redux";
import { ChooiceNumber } from "./styles";
import { addNumberInList } from "../../../../store/betSlice";
import { RootState } from "../../../../store/store";

type Props = {
  numbers: number;
  maxNumbers: number;
};

const GenerateNumbers = ({ numbers, maxNumbers }: Props) => {
  const numbersGame = useSelector<RootState>(
    (state) => state.bet.numbers
  ) as number[];

  const dispatch = useDispatch();
  let value = 1;
  let num: any[] = [];

  while (value <= numbers) {
    num.push(value);
    value++;
  }

  const onClickHandler = (item: {}) => {
    dispatch(addNumberInList(item));
  };

  return (
    <>
      {num.map((item) => {
        let numberItem = item;
        if (item < 10) {
          numberItem = "0" + item;
        }
        return (
          <ChooiceNumber
            key={item}
            id={item}
            className={`${numbersGame.includes(item) && "active"}`}
            onClick={onClickHandler.bind(null, {
              item: item,
              maxNumbers: maxNumbers,
            })}
          >
            {numberItem}
          </ChooiceNumber>
        );
      })}
    </>
  );
};

export default GenerateNumbers;
