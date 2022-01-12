import { Redirect, Route, Switch } from "react-router-dom";

const Lottery = () => {
  return (
    <Switch>
      <Redirect from="/lottery" to="/lottery/list" exact />
      <Route path="/lottery/list" exact>
        <p>List lottery</p>
      </Route>
      <Route path="/lottery/games" exact>
        <p>Lottery Game</p>
      </Route>
    </Switch>
  );
};

export default Lottery;
