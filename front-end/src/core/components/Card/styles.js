import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0px 3px 25px #00000014;
  padding: 30px;
  margin: 30px 0;
`;

export const TextSubtitle = styled.h2`
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  a {
    text-decoration: none;
    color: unset;
  }
  &:hover {
    color: #504e4e;
  }
  @media (max-width: 500px) {
    font-size: 32px;
    margin-top: 20px;
  }
`;
