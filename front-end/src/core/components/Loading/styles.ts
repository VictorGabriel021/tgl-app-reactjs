import styled from "styled-components";

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;

  @media(min-width:500px) {
    height: 58vh;
  }

  @media(min-width:1440px) {
    height: 70vh;
  }

  @media(min-width:1900px) {
    height: 80vh;
  }
`;

export const LoadingSpinner = styled.div`
  &:after {
    content: " ";
    display: block;
    width: 120px;
    height: 120px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid teal;
    border-color: teal transparent teal transparent;
    animation: spinner 1.2s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
