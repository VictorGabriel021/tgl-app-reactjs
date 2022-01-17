import { Link } from "react-router-dom";
import { NotFoundContainer, NotFoundText, NotFoundTitle } from "./styles";

const PageNotFound = () => (
  <NotFoundContainer>
    <NotFoundTitle>Esta Página não está disponível</NotFoundTitle>
    <NotFoundText>
      O link pode não estar funcionando ou a Página pode ter sido removida.
      Verifique se o link que você está tentando abrir está correto.
    </NotFoundText>
    <Link to="/">Página Inicial</Link>
  </NotFoundContainer>
);

export default PageNotFound;
