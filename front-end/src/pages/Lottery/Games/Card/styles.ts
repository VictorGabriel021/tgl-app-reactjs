import styled from "styled-components";

export const CartTitleParagraph = styled.h3`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: bold;
`;

export const TotalParagraph = styled.span`
  font-style: initial;
  font-weight: 300;
  margin-left: 10px;
`;

export const CardCart = styled.div`
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 10px 10px 0 0;
  padding: 30px 20px 45px 20px;
  margin-top: 40px;
`;

export const CardSave = styled.div`
  text-align: center;
  background-color: #f4f4f4;
  border: 1px solid #e2e2e2;
  border-radius: 0 0 10px 10px;
  padding: 25px 0;
  cursor: pointer;
`;

export const TitleCardSave = styled.p`
  color: #27c383;
  font-size: 35px;
  font-weight: bold;
`;

export const CardScroll = styled.div`
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 40px 0;
`;