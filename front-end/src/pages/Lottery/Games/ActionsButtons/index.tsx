import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Bet, GameInfo } from "../../../../core/assets/interfaces/interfaces";
import { sortArray } from "../../../../core/assets/utils/array";
import { isEqualBet } from "../../../../core/assets/utils/bet";
import { clearGame, completeGame } from "../../../../store/betSlice";
import { addToCart } from "../../../../store/cartSlice";
import { RootState } from "../../../../store/store";
import { BtnAction, BtnAddToCart, BtnContainer } from "./styles";

type Props = {
  selectedGame: GameInfo;
};

const ActionsButtons = ({ selectedGame }: Props) => {
  const dispatch = useDispatch();
  const betItem = useSelector((state: RootState) => state.bet);
  const betList = useSelector((state: RootState) => state.cart.games);

  const completeGameHandler = () => {
    dispatch(
      completeGame({
        range: selectedGame.range,
        max_number: selectedGame.max_number,
      })
    );
  };

  const clearGameHandler = () => {
    dispatch(clearGame());
  };

  const addToCartHandler = () => {
    const maxNumbers = selectedGame.max_number;
    const newBetItem: Bet = {
      game_id: betItem.game_id,
      numbers: sortArray([...betItem.numbers]),
    };
    const isEqual = isEqualBet(betList, newBetItem);

    if (isEqual) {
      window.alert("Não é possível adicionar o mesmo jogo de loteria");
    } else if (newBetItem.numbers.length < maxNumbers) {
      let num: string | number = maxNumbers - newBetItem.numbers.length;
      num = num === 1 ? num + " número" : num + " números";
      window.alert(`É necessário selecionar mais ${num}`);
    } else {
      dispatch(addToCart({ betItem: newBetItem, selectedGame }));
      clearGameHandler();
    }
  };

  return (
    <BtnContainer>
      <div>
        <BtnAction onClick={completeGameHandler}>Complete game</BtnAction>
        <BtnAction onClick={clearGameHandler}>Clear game</BtnAction>
      </div>
      <BtnAddToCart onClick={addToCartHandler}>
        <BsCart3 />
        Add to cart
      </BtnAddToCart>
    </BtnContainer>
  );
};

export default ActionsButtons;
