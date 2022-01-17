import styled from "styled-components";

export const NotFoundContainer = styled.div`
  padding: 40px;
  text-align: center;

  @media (max-width: 400px) {
    padding: 40px 10px;
  }
`;

export const NotFoundTitle = styled.p`
  font-size: 36px;
  font-weight: bold;
  font-style: initial;
`;
export const NotFoundText = styled(NotFoundTitle)`
  font-size: 24px;
  font-weight: 300;
`;
