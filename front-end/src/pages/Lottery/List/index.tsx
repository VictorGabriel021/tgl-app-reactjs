import { useEffect, useState, useCallback } from "react";
import {
  GameFilter,
  GameInfo,
  GamesList,
} from "@core/assets/interfaces/interfaces";
import { makeRequest } from "@core/assets/utils/request";
import BtnSumbit from "@core/components/ButtonSubmit";
import GamesFilter from "../GamesFilter";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import {
  Container,
  Content,
  Subtitle,
  TextFilter,
  Filters,
  FiltersMain,
} from "./styles";
import LotteryItem from "./Item";
import { Link } from "react-router-dom";
import { getFilterGames } from "@core/assets/utils/requestGetFilterGames";
import Loading from "@core/components/Loading";
import Error from "@core/components/Error";

const LotteryList = () => {
  const [gamesList, setGamesList] = useState<GamesList[]>([]);
  const [gameFilter, setGameFilter] = useState<GameFilter>({
    min_cart_value: 0,
    types: [],
  });
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
      try {
        const response = await makeRequest({
          url: "/bet/all-bets",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        });
        setGamesList(response.data);
      } catch (error: any) {}
    },
    [token]
  );

  async function fetchData() {
    setIsError(false);
    try {
      const response = await getFilterGames();
      setGameFilter(response);
    } catch (error: any) {
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

  return (
    <Container>
      {gameFilter && gameFilter.min_cart_value > 0 && (
        <Content>
          <div>
            <FiltersMain>
              <Subtitle>RECENT GAMES</Subtitle>
              <BtnSumbit className="fs-5 p-0 d-sm-none" textButton="New Bet" />
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
            {gamesList.map((game) => {
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
