import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./core/components/Navbar";
import Auth from "./pages/Auth";
import Lottery from "./pages/Lottery";

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Redirect from="/" to="/auth/login" exact />
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/lottery">
          <Lottery />
        </Route>
        <Route path="*">not found</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
