import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,
  Content,
  Subtitle,
  TextFilter,
  Filters,
  FiltersMain,
} from "./styles";

import LotteryItem from "./Item";
import GamesFilter from "../GamesFilter";

import { BtnSumbit, Loading, Error } from "@core/components";

import { listGames } from "@core/assets/services/Games/ListGames";
import { listBet } from "@core/assets/services/Bets/ListBet";

import {
  defaultValuesGameFilter,
  GameFilter,
  GameInfo,
  GamesList,
} from "@core/assets/interfaces/Games/interface";

import { RootState } from "@store/store";

const LotteryList = () => {
  const [gamesList, setGamesList] = useState<GamesList[]>([]);
  const [gameFilter, setGameFilter] = useState<GameFilter>(
    defaultValuesGameFilter
  );
  const [params, setParams] = useState<string[]>([]);
  const [filter, setFilter] = useState<number[]>([]);
  const { token } = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getGameList = useCallback(
    async (types?: string[]) => {
      let params: any = "";
      if (!!types) {
        params = {
          type: types,
        };
      }
      const response = await listBet(token, params);
      if (!!response) {
        setGamesList(response);
      }
    },
    [token]
  );

  async function fetchData() {
    setIsError(false);
    setIsLoading(true);
    const response = await listGames();
    if (!!response) {
      setGameFilter(response);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const clearRequest = setTimeout(function () {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(clearRequest);
    };
  }, []);

  useEffect(() => {
    const clearRequest = setTimeout(function () {
      getGameList();
    }, 500);

    return () => {
      clearTimeout(clearRequest);
    };
  }, [getGameList]);

  const onUpdateGameListHandler = (game: GameInfo) => {
    let types: string[];
    let ids: number[];

    if (params.includes(game.type)) {
      setParams((prev) => {
        types = prev.filter((item) => item !== game.type);
        getGameList(types);
        return types;
      });
      setFilter((prev) => {
        ids = prev.filter((item) => item !== game.id);
        return ids;
      });
    } else {
      setParams((prev) => {
        types = [...prev, game.type];
        getGameList(types);
        return types;
      });
      setFilter((prev) => {
        ids = [...prev, game.id];
        return ids;
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !gameFilter) {
    return <Error />;
  }

  let gameListContent = <p>N??o existem apostas registradas para esse jogo!</p>;
  if (gamesList.length === 0 && params.length === 0) {
    gameListContent = <p>N??o existem apostas para serem filtradas!</p>;
  }

  return (
    <Container>
      {gameFilter && gameFilter.min_cart_value > 0 && (
        <Content>
          <div>
            <FiltersMain>
              <Subtitle>RECENT GAMES</Subtitle>
              <Link to={"/lottery/games"}>
                <BtnSumbit
                  className="fs-5 p-0 d-sm-none"
                  textButton="New Bet"
                />
              </Link>
              <Filters>
                <TextFilter>Filters</TextFilter>
                <GamesFilter
                  onUpdateFilter={onUpdateGameListHandler}
                  filter={filter}
                  gamesList={gameFilter.types}
                />
              </Filters>
              <Link to={"/lottery/games"}>
                <BtnSumbit
                  className="fs-5 p-0 d-none d-sm-inline"
                  textButton="New Bet"
                />
              </Link>
            </FiltersMain>
            {gamesList.length === 0 && (
              <div className="alert alert-danger m-5">{gameListContent}</div>
            )}
            ;
            {gamesList.length > 0 &&
              gamesList.map((game) => {
                const gameColor = gameFilter.types.find(
                  (item) => item.id === game.game_id
                )!.color;
                return (
                  <LotteryItem
                    key={game.id}
                    choosen_numbers={game.choosen_numbers}
                    gameDate={game.created_at}
                    gameType={game.type.type}
                    price={game.price}
                    color={gameColor}
                  />
                );
              })}
          </div>
        </Content>
      )}
    </Container>
  );
};

export default LotteryList;
