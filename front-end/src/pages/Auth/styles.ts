import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 991px) {
    margin: 40px auto;
  }
`;

export const Content = styled.div`
  height: 83vh;
  align-items: center;
  @media (max-width: 991.98px) {
    height: auto;
  }
`;

export const TextCenter = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 65px;
  @media (max-width: 500px) {
    font-size: 35px;
  }
`;

export const Button = styled.button`
  color: #fff;
  font-size: 22px;
  font-style: italic;
  font-weight: bold;
  background-color: #b5c401;
  border-radius: 50px;
  width: 150px;
  margin: 25px 0;

  &:hover {
    background-color: #98a312;
    color: #fff;
  }
`;

export const Subtitle = styled.h2`
  font-size: 85px;
  font-weight: bold;
  text-transform: uppercase;
  @media (max-width: 500px) {
    font-size: 55px;
  }
`;
