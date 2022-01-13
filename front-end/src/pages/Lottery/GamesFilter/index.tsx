import { GameInfo } from "../../../core/assets/types/types";
import { ButtonGames } from "./styles";

type Props = {
  onUpdateFilter(type: string): void;
  filter: string[];
  gamesList: GameInfo[];
};

const GamesFilter = ({ onUpdateFilter, filter, gamesList }: Props) => {
  const addToFilterhandler = (type: string) => {
    onUpdateFilter(type);
  };

  return (
    <>
      {gamesList.map((game) => {
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
