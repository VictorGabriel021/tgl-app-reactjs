import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./core/components/Footer";
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
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
