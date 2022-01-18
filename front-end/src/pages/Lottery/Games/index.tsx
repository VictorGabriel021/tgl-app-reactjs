import { useCallback, useEffect, useState } from "react";
import GamesFilter from "../GamesFilter";
import {
  Container,
  LotteryTitle,
  LotteryParagraph,
  LotteryChooiceNumber,
  DescriptionGame,
} from "./styles";
import GamesCard from "./Card";
import { GameFilter, GameInfo } from "@core/assets/interfaces/interfaces";
import GenerateNumbers from "./Numbers";
import { getFilterGames } from "@core/assets/utils/requestGetFilterGames";
import { useDispatch } from "react-redux";
import { clearGame, getGameId } from "@store/betSlice";
import ActionsButtons from "./ActionsButtons";
import { clearCart } from "@store/cartSlice";
import Loading from "@core/components/Loading";

const LotteryGames = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<number[]>([]);
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getFilterGames();
      setGamesList(response);
      setSelectedGame(response.types[0]);
      setFilter([response.types[0].id]);
      dispatch(getGameId(response.types[0].id));
    } catch (error: any) {}
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    dispatch(clearCart());
  }, [fetchData, dispatch]);

  const onUpdateGameListHandler = (game: GameInfo) => {
    dispatch(clearGame());
    setFilter([game.id]);
    const index = gamesList.types.findIndex((item: any) => item.id === game.id);
    if (selectedGame.id !== game.id) {
      setSelectedGame(gamesList.types[index]);
      dispatch(getGameId(game.id));
    }
  };

  return (
    <Container className="container">
      {isLoading ? (
        <Loading />
      ) : (
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
              <GenerateNumbers
                numbers={selectedGame.range}
                maxNumbers={selectedGame.max_number}
              />
            </LotteryChooiceNumber>
            <ActionsButtons selectedGame={selectedGame} />
          </div>
          <div className="col-12 col-lg-4">
            <GamesCard gamesList={gamesList} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default LotteryGames;
