import { Redirect, Route, Switch } from "react-router-dom";

import PageNotFound from "@core/components/PageNotFound";

import UserDetails from "./Details";
import UserEdit from "./Edit";

const User = () => {
  return (
    <Switch>
      <Redirect from="/user" to="/user/details" exact />
      <Route path="/user/details" exact>
        <UserDetails />
      </Route>
      <Route path="/user/edit" exact>
        <UserEdit />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default User;
