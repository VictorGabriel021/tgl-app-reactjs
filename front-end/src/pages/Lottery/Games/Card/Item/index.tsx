import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { priceReal } from "../../../../../core/assets/utils/price";
import { removeFromCart } from "../../../../../store/cartSlice";
import {
  ColorGame,
  IconTrash,
  ItemContent,
  TextParagraph,
  TextParagraphBoldMedia,
} from "../../../styles";

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
  const dispatch = useDispatch();
  const priceInReal = priceReal(price);
  const newChoosen_numbers = choosen_numbers.join();

  const removeToCartHandler = () => {
    if (window.confirm("Você realmente deseja excluir esta aposta ?"))
      dispatch(removeFromCart({ id, price }));
  };

  return (
    <div className="d-flex align-items-center">
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
