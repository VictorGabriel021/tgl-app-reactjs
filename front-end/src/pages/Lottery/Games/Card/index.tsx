import { HiOutlineArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { GameFilter } from "@core/assets/interfaces/interfaces";
import { priceReal } from "@core/assets/utils/price";
import { RootState } from "@store/store";
import LotteryCardItem from "./Item";
import {
  CardCart,
  CardSave,
  CardScroll,
  CartTitleParagraph,
  TitleCardSave,
  TotalParagraph,
} from "./styles";
import { newBet } from "@core/assets/services/Bets/NewBet";

type Props = {
  gamesList: GameFilter;
};

const GamesCard = ({ gamesList }: Props) => {
  const { games, totalCart } = useSelector((state: RootState) => state.cart);
  const TotalPrice =
    totalCart === 0 ? "TOTAL: R$ 0,00" : `TOTAL: ${priceReal(totalCart)}`;
  const history = useHistory();
  const { token } = useSelector((state: RootState) => state.auth.token);

  const saveBet = async () => {
    const response = await newBet(token, games);
    if (!!response) {
      history.push("/lottery");
      toast.success("Apostas cadastradas com sucesso !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const saveBetListhandler = () => {
    if (totalCart >= gamesList.min_cart_value) {
      saveBet();
    } else {
      toast.warning(
        `O valor mínimo para apostar é ${gamesList.min_cart_value} reais !`,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  return (
    <>
      <CardCart>
        <CartTitleParagraph>Cart</CartTitleParagraph>
        <CardScroll>
          {games.length === 0 && (
            <div className="alert alert-danger">
              O carrinho está vazio por favor insira as apostas!
            </div>
          )}
          {games.length > 0 &&
            gamesList.types.length > 0 &&
            games.map((item) => {
              const gameInfo = gamesList.types.find(
                (game) => game.id === item.game_id
              );
              return (
                <LotteryCardItem
                  key={item.id as number}
                  id={item.id as number}
                  choosen_numbers={item.numbers}
                  gameType={gameInfo!.type}
                  price={gameInfo!.price}
                  color={gameInfo!.color}
                />
              );
            })}
        </CardScroll>
        <CartTitleParagraph>
          Cart
          <TotalParagraph>{TotalPrice}</TotalParagraph>
        </CartTitleParagraph>
      </CardCart>
      <CardSave onClick={saveBetListhandler}>
        <TitleCardSave>
          Save
          <HiOutlineArrowRight className="ms-3" />
        </TitleCardSave>
      </CardSave>
    </>
  );
};

export default GamesCard;
