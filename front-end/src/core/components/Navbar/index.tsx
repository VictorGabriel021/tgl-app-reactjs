import { HiOutlineArrowRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "@store/authSlice";
import { RootState } from "@store/store";
import {
  NavContainer,
  NavContent,
  NavSection,
  NavLogo,
  NavItem,
  NavLine,
  NavItemLogout,
  NavItemAccount,
} from "./styles";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <NavContainer>
      <NavContent>
        <NavSection>
          <NavLogo>
            <Link to="/lottery">TGL</Link>
          </NavLogo>
          <NavItem>
            <Link to="/lottery">Home</Link>
          </NavItem>
        </NavSection>
        <NavSection>
          {isAuthenticated && <NavItemAccount>Account</NavItemAccount>}
          {isAuthenticated && (
            <NavItemLogout onClick={logoutHandler}>
              Log out
              <HiOutlineArrowRight />
            </NavItemLogout>
          )}
        </NavSection>
      </NavContent>
      <NavLine />
    </NavContainer>
  );
};

export default Navbar;
