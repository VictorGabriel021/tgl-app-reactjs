import { Redirect, Route, Switch } from "react-router-dom";
import {
  Container,
  Div,
  Title,
  Button,
  Subtitle,
  TextCenter,
  Content,
} from "./styles";
import Login from "./components/Login";
import Register from "./components/Register";

const Auth = () => {
  return (
    <Container className="container">
      <Content className="row">
        <TextCenter className="col-12 col-lg-6">
          <Title>
            The <br />
            Greatest <br />
            App
          </Title>
          <Button className="btn btn-button">for</Button>
          <Subtitle>lottery</Subtitle>
        </TextCenter>
        <Div className="col-12 col-lg-6">
          <Switch>
            <Redirect from="/auth" to="/auth/login" exact />
            <Route path="/auth/login" exact>
              <Login
                title="Authentication"
                textButton="Log In"
                textRedirect="Sign Up"
              />
            </Route>
            <Route path="/auth/recover" exact>
              recover
            </Route>
            <Route path="/auth/register" exact>
              <Register
                title="Registration"
                textButton="Register"
                textRedirect="Back"
              />
            </Route>
          </Switch>
        </Div>
      </Content>
    </Container>
  );
};

export default Auth;
