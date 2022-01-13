import { Redirect, Route, Switch } from "react-router-dom";
import LotteryList from "./List";

const Lottery = () => {
  return (
    <Switch>
      <Redirect from="/lottery" to="/lottery/list" exact />
      <Route path="/lottery/list" exact>
        <LotteryList />
      </Route>
      <Route path="/lottery/games" exact>
        <p>GamesFilter</p>
      </Route>
    </Switch>
  );
};

export default Lottery;
