import { useEffect, useState, useCallback } from "react";
import { GamesList } from "../../../core/assets/types/types";
import { makeRequest } from "../../../core/assets/utils/request";
import BtnSumbit from "../../../core/components/ButtonSubmit";
import GamesFilter from "../GamesFilter";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { UserLoginState } from "../../../store/store";

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

const LotteryList = () => {
  const [gamesList, setGamesList] = useState<GamesList[]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const userLogin: any = useSelector<UserLoginState>(
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

  useEffect(() => {
    getGameList();
  }, [getGameList]);

  const onUpdateGameListHandler = (type: string) => {
    let types: string[];
    if (filter.includes(type)) {
      setFilter((prev) => {
        types = prev.filter((item) => item !== type);
        getGameList(types);
        return types;
      });
    } else {
      setFilter((prev) => {
        types = [...prev, type];
        getGameList(types);
        return types;
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
              />
            );
          })}
        </div>
      </Content>
    </Container>
  );
};

export default LotteryList;
