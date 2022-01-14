import { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { clearGame, completeGame, getGameId } from "../../../store/betSlice";
import { addToCart } from "../../../store/cartSlice";
import { RootState } from "../../../store/store";
import { isEqualBet } from "../../../core/assets/utils/bet";

const LotteryGames = () => {
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

  const betItem = useSelector<RootState>((state) => state.bet);
  const betItemNumbers = useSelector<RootState>((state) => state.bet.numbers);
  const betList = useSelector<RootState>((state) => state.cart.games);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    const response = await getFilterGames();
    setGamesList(response);
    setSelectedGame(response.types[0]);
    setFilter([response.types[0].id]);
    dispatch(getGameId(response.types[0].id));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const completeGameHandler = (item: {}) => {
    dispatch(completeGame(item));
  };

  const clearGameHandler = () => {
    dispatch(clearGame());
  };

  const addToCartHandler = () => {
    const isEqual = isEqualBet(betList, betItem);
    const maxNumbers = selectedGame.max_number;

    let newBetItemNumbers = betItemNumbers as number[];
    const betNumbers = newBetItemNumbers.length;

    if (isEqual) {
      window.alert("Não é possível adicionar o mesmo jogo de loteria");
    } else if (betNumbers < maxNumbers) {
      const num = maxNumbers - betNumbers;
      window.alert(`É necessário selecionar mais ${num} números`);
    } else {
      dispatch(addToCart({ betItem, selectedGame }));
      clearGameHandler();
    }
  };

  const onUpdateGameListHandler = (game: GameInfo) => {
    clearGameHandler();
    setFilter([game.id]);
    const index = gamesList.types.findIndex((item: any) => item.id === game.id);
    if (selectedGame.id !== game.id) {
      setSelectedGame(gamesList.types[index]);
      dispatch(getGameId(game.id));
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
            <GenerateNumbers
              numbers={selectedGame.range}
              maxNumbers={selectedGame.max_number}
            />
          </LotteryChooiceNumber>
          <BtnContainer>
            <div>
              <BtnAction
                onClick={completeGameHandler.bind(null, {
                  range: selectedGame.range,
                  max_number: selectedGame.max_number,
                })}
              >
                Complete game
              </BtnAction>
              <BtnAction onClick={clearGameHandler}>Clear game</BtnAction>
            </div>
            <BtnAddToCart onClick={addToCartHandler}>
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
