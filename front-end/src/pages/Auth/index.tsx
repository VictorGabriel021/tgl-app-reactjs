import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import {
  Container,
  Title,
  Button,
  Subtitle,
  TextCenter,
  Content,
} from "./styles";
import Login from "@pages/Auth/components/Login";
import Register from "@pages/Auth/components/Register";
import Reset from "@pages/Auth/components/Reset";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@store/authSlice";
import PageNotFound from "@core/components/PageNotFound";

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch, history]);

  return (
    <Container className="container">
      <Content className="row">
        <TextCenter className="col-12 col-lg-6">
          <Title>
            The <br />
            Greatest <br />
            App
          </Title>
          <Link to="/">
            <Button className="btn btn-button">for</Button>
          </Link>
          <Subtitle>lottery</Subtitle>
        </TextCenter>
        <div className="col-12 col-lg-6">
          <Switch>
            <Redirect from="/auth" to="/auth/login" exact />
            <Route path="/auth/login" exact>
              <Login
                title="Authentication"
                textButton="Log In"
                textRedirect="Sign Up"
              />
            </Route>
            <Route path="/auth/reset" exact>
              <Reset
                title="Reset password"
                textButton="Send link"
                textRedirect="Back"
              />
            </Route>
            <Route path="/auth/register" exact>
              <Register
                title="Registration"
                textButton="Register"
                textRedirect="Back"
              />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </Content>
    </Container>
  );
};

export default Auth;
