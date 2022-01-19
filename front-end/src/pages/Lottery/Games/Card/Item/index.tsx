import { useState } from "react";
import { BsTrash } from "react-icons/bs";

import {
  ColorGame,
  IconTrash,
  ItemContent,
  TextParagraph,
  TextParagraphBoldMedia,
} from "@pages/Lottery/styles";

import RemoveItemModal from "../RemoveItemModal";

import { priceReal } from "@core/assets/utils/price";

type Props = {
  id: number;
  choosen_numbers: number[];
  gameType: string;
  price: number;
  color: string;
};

const LotteryCardItem = ({
  id,
  choosen_numbers,
  gameType,
  price,
  color,
}: Props) => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const priceInReal = priceReal(price);
  const newChoosen_numbers = choosen_numbers.join();

  const removeToCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div className="d-flex align-items-center">
      {cartIsShown && (
        <RemoveItemModal id={id} price={price} onClose={hideCartHandler} />
      )}
      <IconTrash>
        <BsTrash onClick={removeToCartHandler} />
      </IconTrash>
      <ItemContent color={color}>
        <TextParagraphBoldMedia>{newChoosen_numbers}</TextParagraphBoldMedia>
        <TextParagraph>
          <ColorGame color={color}>{gameType}</ColorGame>
          <span className="ms-2">{priceInReal}</span>
        </TextParagraph>
      </ItemContent>
    </div>
  );
};

export default LotteryCardItem;
