import { Redirect, Route, Switch } from "react-router-dom";
import PageNotFound from "../../core/components/PageNotFound";
import LotteryGames from "./Games";
import LotteryList from "./List";

const Lottery = () => {
  return (
    <Switch>
      <Redirect from="/lottery" to="/lottery/list" exact />
      <Route path="/lottery/list" exact>
        <LotteryList />
      </Route>
      <Route path="/lottery/games" exact>
        <LotteryGames />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default Lottery;
