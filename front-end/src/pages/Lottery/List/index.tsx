import { useEffect, useState, useCallback } from "react";
import {
  GameFilter,
  GameInfo,
  GamesList,
} from "../../../core/assets/types/types";
import { makeRequest } from "../../../core/assets/utils/request";
import BtnSumbit from "../../../core/components/ButtonSubmit";
import GamesFilter from "../GamesFilter";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

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
import { getFilterGames } from "../../../core/assets/utils/requestGetFilterGames";

const LotteryList = () => {
  const [gamesList, setGamesList] = useState<GamesList[]>([]);
  const [gameFilter, setGameFilter] = useState<GameFilter>({
    min_cart_value: 0,
    types: [],
  });

  const [params, setParams] = useState<string[]>([]);
  const [filter, setFilter] = useState<number[]>([]);
  const userLogin: any = useSelector<RootState>(
    (state) => state.userLogin.token
  );

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
            Authorization: `Bearer ${userLogin.token}`,
          },
          params,
        });
        setGamesList(response.data);
      } catch (error: any) {
        let errorMessage = "Network Error";
        if (error.message === "Request failed with status code 404") {
          errorMessage = "List Games not found !";
        }
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    [userLogin.token]
  );

  async function fetchData() {
    const response = await getFilterGames();
    setGameFilter(response);
  }

  useEffect(() => {
    getGameList();
    fetchData();
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

  return (
    <Container>
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
            return (
              <LotteryItem
                key={game.id}
                choosen_numbers={game.choosen_numbers}
                gameDate={game.created_at}
                gameType={game.type.type}
                price={game.price}
                color={gameFilter.types[(game.type.id - 1)].color}
              />
            );
          })}
        </div>
      </Content>
    </Container>
  );
};

export default LotteryList;
