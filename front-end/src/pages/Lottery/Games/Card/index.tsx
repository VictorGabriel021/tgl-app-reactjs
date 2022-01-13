import { HiOutlineArrowRight } from "react-icons/hi";
import {
  CardCart,
  CardSave,
  CardScroll,
  CartTitleParagraph,
  TitleCardSave,
  TotalParagraph,
} from "./styles";

const GamesCard = () => {
  return (
    <>
      <CardCart>
        <CartTitleParagraph>Cart</CartTitleParagraph>
        <CardScroll>
          <div className="alert alert-danger">
            The cart is empty please insert the games!
          </div>
        </CardScroll>
        <CartTitleParagraph>
          Cart
          <TotalParagraph>TOTAL: R$ 0,00</TotalParagraph>
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
