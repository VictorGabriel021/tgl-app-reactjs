import styled from "styled-components";

export const WarningIcon = styled.div`
  font-size: 150px;
  color: #f3c735;

  @media (max-width: 500px) {
    font-size: 100px;
  }
`;

export const CloseIcon = styled.div`
  justify-content: end;
  display: flex;
  font-size: 40px;
  cursor: pointer;
`;

export const Button = styled.button`
  width: 120px;
`;
