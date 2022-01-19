import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GamesFilter from "../GamesFilter";

import {
  Container,
  LotteryTitle,
  LotteryParagraph,
  LotteryChooiceNumber,
  DescriptionGame,
} from "./styles";

import { Loading, Error } from "@core/components";

import { listGames } from "@core/assets/services/Games/ListGames";

import { clearGame, getGameId } from "@store/betSlice";
import { clearCart } from "@store/cartSlice";

import GamesCard from "./Card";
import GenerateNumbers from "./Numbers";
import ActionsButtons from "./ActionsButtons";

import {
  defaultValuesGameFilter,
  defaultValuesGameInfo,
  GameFilter,
  GameInfo,
} from "@core/assets/interfaces/Games/interface";

const LotteryGames = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<number[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameInfo>(
    defaultValuesGameInfo
  );
  const [gamesList, setGamesList] = useState<GameFilter>(
    defaultValuesGameFilter
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const response = await listGames();
    if (!!response) {
      setGamesList(response);
      setSelectedGame(response.types[0]);
      setFilter([response.types[0].id]);
      dispatch(getGameId(response.types[0].id));
    } else {
      setIsError(true);
    }
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

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
    </Container>
  );
};

export default LotteryGames;
