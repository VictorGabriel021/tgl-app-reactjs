import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./core/components/Footer";
import Navbar from "./core/components/Navbar";
import PageNotFound from "./core/components/PageNotFound";
import PrivateRoute from "./core/components/Routes/PrivateRoute";
import Auth from "./pages/Auth";
import Lottery from "./pages/Lottery";
import { RootState } from "./store/store";

const Routes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Redirect from="/" to="/auth/login" exact />
        <Route path="/auth">
          {!isAuthenticated && <Auth />}
          {isAuthenticated && <Redirect to="/lottery" />}
        </Route>
        <PrivateRoute path="/lottery">
          <Lottery />
        </PrivateRoute>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
