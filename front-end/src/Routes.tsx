import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Navbar, PrivateRoute, PageNotFound, Footer } from "@core/components";

import User from "@pages/User";
import Auth from "@pages/Auth";
import Lottery from "@pages/Lottery";

import { RootState } from "@store/store";

const Routes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Switch>
          <Redirect from="/" to="/auth/login" exact />
          <Route path="/auth">
            {!isAuthenticated && <Auth />}
            {isAuthenticated && <Redirect to="/lottery" />}
          </Route>
          <PrivateRoute path="/user">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/lottery">
            <Lottery />
          </PrivateRoute>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
