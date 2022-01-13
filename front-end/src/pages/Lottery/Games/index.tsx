import { useEffect, useState } from "react";
import GamesFilter from "../GamesFilter";
import { BsCart3 } from "react-icons/bs";
import {
  Container,
  LotteryTitle,
  LotteryParagraph,
  BtnAction,
  BtnAddToCart,
  LotteryChooiceNumber,
  BtnContainer,
  DescriptionGame,
} from "./styles";
import GamesCard from "./Card";
import { GameFilter, GameInfo } from "../../../core/assets/types/types";
import GenerateNumbers from "./Numbers";
import { getFilterGames } from "../../../core/assets/utils/requestGetFilterGames";

const LotteryGames = () => {
  const [filter, setFilter] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameInfo>({
    id: 0,
    type: "",
    description: "",
    range: 0,
    price: 0,
    max_number: 0,
    color: "",
  });
  const [gamesList, setGamesList] = useState<GameFilter>({
    min_cart_value: 0,
    types: [],
  });

  async function fetchData() {
    const response = await getFilterGames();
    setGamesList(response);
    setSelectedGame(response.types[0]);
    setFilter([response.types[0].type]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onUpdateGameListHandler = (type: string) => {
    setFilter([type]);
    const index = gamesList.types.findIndex((item: any) => item.type === type);
    if (selectedGame.type !== type) {
      setSelectedGame(gamesList.types[index]);
    }
  };

  return (
    <Container className="container">
      <div className="row">
        <div className="col-12 col-lg-8">
          <LotteryTitle>
            <b>NEW BET</b> FOR {selectedGame.type}
          </LotteryTitle>
          <LotteryParagraph>Choose a game</LotteryParagraph>
          <GamesFilter
            onUpdateFilter={onUpdateGameListHandler}
            filter={filter}
            gamesList={gamesList.types}
          />
          <LotteryParagraph>Fill your bet</LotteryParagraph>
          <DescriptionGame>{selectedGame.description}</DescriptionGame>
          <LotteryChooiceNumber>
            <GenerateNumbers numbers={selectedGame.range} />
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
