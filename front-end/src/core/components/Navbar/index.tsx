import { HiOutlineArrowRight } from "react-icons/hi";
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
  return (
    <NavContainer>
      <NavContent>
        <NavSection>
          <NavLogo>TGL</NavLogo>
          <NavItem>Home</NavItem>
        </NavSection>
        <NavSection>
          <NavItemAccount>Account</NavItemAccount>
          <NavItemLogout>
            Sair
            <HiOutlineArrowRight />
          </NavItemLogout>
        </NavSection>
      </NavContent>
      <NavLine />
    </NavContainer>
  );
};

export default Navbar;
