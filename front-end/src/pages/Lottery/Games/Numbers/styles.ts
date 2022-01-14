import styled from "styled-components";

export const ChooiceNumber = styled.p`
  background-color: #adc0c4;
  padding: 20px;
  border-radius: 100%;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin: 0 12px 20px 0;
  text-align: center;
  cursor: pointer;

  &.active,
  &:hover {
    background-color: #27C383;
  }

  @media (max-width: 600px) {
    padding: 10px;
  }
`;
