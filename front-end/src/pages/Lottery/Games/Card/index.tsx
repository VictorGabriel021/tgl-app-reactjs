import { HiOutlineArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { GameFilter } from "@core/assets/interfaces/interfaces";
import { priceReal } from "@core/assets/utils/price";
import { makeRequest } from "@core/assets/utils/request";
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
    try {
      await makeRequest({
        method: "POST",
        url: "/bet/new-bet",
        data: { games: games },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      history.push("/lottery");
      toast.success("Apostas cadastradas com sucesso !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error: any) {}
  };

  const saveBetListhandler = () => {
    if (totalCart >= gamesList.min_cart_value) {
      saveBet();
    } else {
      window.alert(
        `O valor mínimo para apostar é ${gamesList.min_cart_value} reais !`
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
            games.map((item, index) => {
              const gameInfo = gamesList.types.find(
                (game) => game.id === item.game_id
              );
              return (
                <LotteryCardItem
                  key={index}
                  id={index}
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
