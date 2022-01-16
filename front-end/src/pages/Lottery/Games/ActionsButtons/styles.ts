import styled from "styled-components";

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
