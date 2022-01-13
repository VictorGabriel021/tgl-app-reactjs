import styled from "styled-components";

export const ButtonGames = styled.button<{ color: string }>`
  border: 1px solid ${(props) => props.color};
  border-radius: 20px;
  background-color: #fff;
  color: ${(props) => props.color};
  padding: 0 25px;
  height: 40px;
  margin: 10px 20px 10px 0;

  &:hover {
    background-color: ${(props) => props.color};
    color: #fff;
  }

  &.active {
    background-color: ${(props) => props.color};
    color: #fff;
    transition: all 0.5s;
  }

  &.active:hover {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
`;
