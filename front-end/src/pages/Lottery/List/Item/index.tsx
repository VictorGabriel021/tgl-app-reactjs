import {
  ColorGame,
  ItemContent,
  TextParagraph,
  TextParagraphBold,
} from "@pages/Lottery/styles";

import { dateBrazil } from "@core/assets/utils/date";
import { priceReal } from "@core/assets/utils/price";

type Props = {
  choosen_numbers: string;
  gameDate: string;
  gameType: string;
  price: number;
  color: string;
};

const LotteryItem = ({
  choosen_numbers,
  gameDate,
  gameType,
  price,
  color,
}: Props) => {
  const priceInReal = priceReal(price);
  let date: any = new Date(gameDate);
  date = dateBrazil(date);

  return (
    <div className="d-flex align-items-center">
      <ItemContent color={color}>
        <TextParagraphBold>{choosen_numbers}</TextParagraphBold>
        <TextParagraph>
          {date} - ({priceInReal})
        </TextParagraph>
        <ColorGame color={color}>{gameType}</ColorGame>
      </ItemContent>
    </div>
  );
};

export default LotteryItem;
