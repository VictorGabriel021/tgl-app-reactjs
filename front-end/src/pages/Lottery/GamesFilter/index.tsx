import { GameInfo } from "../../../core/assets/types/types";
import { ButtonGames } from "./styles";

type Props = {
  onUpdateFilter(game: GameInfo): void;
  filter: number[];
  gamesList: GameInfo[];
};

const GamesFilter = ({ onUpdateFilter, filter, gamesList }: Props) => {
  const addToFilterhandler = (game: GameInfo) => {
    onUpdateFilter(game);
  };

  return (
    <>
      {gamesList.map((game) => {
        return (
          <ButtonGames
            key={game.id}
            color={game.color}
            className={`${filter.includes(game.id) && "active"}`}
            onClick={addToFilterhandler.bind(null, game)}
          >
            {game.type}
          </ButtonGames>
        );
      })}
    </>
  );
};

export default GamesFilter;
