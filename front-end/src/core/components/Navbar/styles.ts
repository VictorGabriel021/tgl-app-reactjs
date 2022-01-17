import styled from "styled-components";

export const NavContainer = styled.nav``;

export const NavSection = styled.section`
  display: flex;
  align-items: center;
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-around;
  font-weight: 600;
`;

export const NavLogo = styled.h2`
  font-size: 44px;
  font-weight: unset;
  margin-right: 50px;
  margin-bottom: 0;
  border-bottom: 6px solid #b5c401;
  padding: 10px 10px 0 10px;
  z-index: 1;

  a {
    color: unset;
    text-decoration: unset;
  }

  a:hover {
    color: #5c5a5a;
  }

  @media (max-width: 500px) {
    font-size: 28px;
    margin-right: 10px;
  }
`;

export const NavItem = styled.p`
  font-size: 20px;
  margin-bottom: 0;

  a {
    color: unset;
    text-decoration: unset;
  }

  a:hover {
    color: #5c5a5a;
  }

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

export const NavItemAccount = styled(NavItem)`
  margin-right: 40px;
  @media (max-width: 500px) {
    margin-right: 20px;
  }
`;

export const NavItemLogout = styled(NavItem)`
  cursor: pointer;
  &:hover {
    color: #5c5a5a;
  }

  svg {
    margin-left: 15px;
    font-size: 25px;

    @media (max-width: 500px) {
      margin-left: 5px;
      font-size: 18px;
    }
  }
`;

export const NavLine = styled.hr`
  margin-top: -3px;
  z-index: 0;
`;
