import { HiOutlineArrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { GameFilter } from "../../../../core/assets/types/types";
import { priceReal } from "../../../../core/assets/utils/price";
import { RootState } from "../../../../store/store";
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

  return (
    <>
      <CardCart>
        <CartTitleParagraph>Cart</CartTitleParagraph>
        <CardScroll>
          {games.length === 0 ? (
            <div className="alert alert-danger">
              O carrinho está vazio por favor insira as apostas!
            </div>
          ) : (
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
            })
          )}
        </CardScroll>
        <CartTitleParagraph>
          Cart
          <TotalParagraph>{TotalPrice}</TotalParagraph>
        </CartTitleParagraph>
      </CardCart>
      <CardSave>
        <TitleCardSave>
          Save
          <HiOutlineArrowRight className="ms-3" />
        </TitleCardSave>
      </CardSave>
    </>
  );
};

export default GamesCard;
