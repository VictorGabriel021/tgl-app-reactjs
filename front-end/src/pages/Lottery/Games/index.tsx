import { useState } from "react";
import GamesFilter from "../GamesFilter";
import { BsCart3 } from "react-icons/bs";
import {
  Container,
  LotteryTitle,
  LotteryParagraph,
  BtnAction,
  BtnAddToCart,
  ChooiceNumber,
  LotteryChooiceNumber,
  BtnContainer,
  DescriptionGame,
} from "./styles";
import GamesCard from "./Card";

const LotteryGames = () => {
  const [filter, setFilter] = useState<string[]>([]);

  const onUpdateGameListHandler = (type: string) => {
    setFilter([type]);
  };

  return (
    <Container className="container">
      <div className="row">
        <div className="col-12 col-lg-8">
          <LotteryTitle>
            <b>NEW BET</b> FOR MEGA-SENA
          </LotteryTitle>
          <LotteryParagraph>Choose a game</LotteryParagraph>
          <GamesFilter
            onUpdateFilter={onUpdateGameListHandler}
            filter={filter}
          />
          <LotteryParagraph>Fill your bet</LotteryParagraph>
          <DescriptionGame>Description dynamic</DescriptionGame>
          <LotteryChooiceNumber>
            <ChooiceNumber>01</ChooiceNumber>
            <ChooiceNumber>01</ChooiceNumber>
            <ChooiceNumber>01</ChooiceNumber>
            <ChooiceNumber>01</ChooiceNumber>
            <ChooiceNumber>01</ChooiceNumber>
            <ChooiceNumber>01</ChooiceNumber>
            <ChooiceNumber>01</ChooiceNumber>
          </LotteryChooiceNumber>
          <BtnContainer>
            <div>
              <BtnAction>Complete game</BtnAction>
              <BtnAction>Clear game</BtnAction>
            </div>
            <BtnAddToCart>
              <BsCart3 />
              Add to cart
            </BtnAddToCart>
          </BtnContainer>
        </div>
        <div className="col-12 col-lg-4">
          <GamesCard />
        </div>
      </div>
    </Container>
  );
};

export default LotteryGames;
