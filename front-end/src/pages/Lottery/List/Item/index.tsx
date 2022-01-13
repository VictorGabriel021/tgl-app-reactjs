import { ItemContent, TextParagraph, TextParagraphBold } from "./styles";

type Props = {
  choosen_numbers: string;
  gameDate: string;
  gameType: string;
  price: number;
};

const LotteryItem = ({ choosen_numbers, gameDate, gameType, price }: Props) => {
  const priceInReal = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const date = new Date(gameDate);  
  let dateBrazil = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  
  return (
    <ItemContent>
      <TextParagraphBold>{choosen_numbers}</TextParagraphBold>
      <TextParagraph>
        {dateBrazil} - ({priceInReal})
      </TextParagraph>
      <p>{gameType}</p>
    </ItemContent>
  );
};

export default LotteryItem;
