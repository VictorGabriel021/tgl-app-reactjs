import styled from "styled-components";

export const Container = styled.div`
  padding: 40px 20px;
`;

export const LotteryTitle = styled.h1`
  font-size: 24px;
  text-transform: Uppercase;
`;

export const LotteryParagraph = styled.p`
  font-weight: bold;
  color: #868686;
  margin-top: 30px;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Btn = styled.button`
  padding: 7px 20px;
  border-radius: 10px;
  margin-top: 20px;
  border: 3px solid #27c383;
  &:hover {
    background-color: #27c383;
    color: #fff;
  }
`;

export const DescriptionGame = styled.p`
  margin-top: -10px;
`;

export const BtnAction = styled(Btn)`
  background-color: #fff;
  color: #27c383;
  margin-right: 20px;
`;

export const BtnAddToCart = styled(Btn)`
  background-color: #27c383;
  color: #fff;
  svg {
    font-size: 25px;
    margin-right: 20px;
  }
`;

export const LotteryChooiceNumber = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 35px 0 10px 0;
`;
