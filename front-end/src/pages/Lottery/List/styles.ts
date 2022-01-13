import styled from "styled-components";

export const Container = styled.div`
  margin: 50px auto;
  max-width: 1500px;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (min-width: 2560px) {
    justify-content: space-between;
  }
`;

export const Subtitle = styled.h2`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 24px;
  margin: 0 35px 0 0;
`;

export const TextFilter = styled.p`
  color: #868686;
  margin: 0 15px 0 0;
  @media (max-width: 550px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const FiltersMain = styled(Filters)`
  @media (max-width: 850px) {
    padding: 10px 15px 0 15px;
  }
`;
