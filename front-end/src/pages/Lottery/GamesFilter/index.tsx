import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GameFilter } from "../../../core/assets/types/types";
import { makeRequest } from "../../../core/assets/utils/request";
import { ButtonGames } from "./styles";

type Props = {
  onUpdateFilter(type: string): void;
  filter: string[];
};

const GamesFilter = ({ onUpdateFilter, filter }: Props) => {
  const [gamesList, setGamesList] = useState<GameFilter>({
    min_cart_value: 0,
    types: [],
  });

  const addToFilterhandler = (type: string) => {
    onUpdateFilter(type);
  };

  useEffect(() => {
    async function getFilterList() {
      try {
        const response = await makeRequest({ url: "/cart_games" });
        setGamesList(response.data);
      } catch (error: any) {
        let errorMessage = "Network Error";
        if (error.message === "Request failed with status code 404") {
          errorMessage = "Filter not found !";
        }
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    getFilterList();
  }, []);

  return (
    <>
      {gamesList.types.map((game) => {
        return (
          <ButtonGames
            key={game.id}
            color={game.color}
            className={`${filter.includes(game.type) && "active"}`}
            onClick={addToFilterhandler.bind(null, game.type)}
          >
            {game.type}
          </ButtonGames>
        );
      })}
    </>
  );
};

export default GamesFilter;
