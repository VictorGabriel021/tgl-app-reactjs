import styled from "styled-components";

export const Form = styled.form``;

export const Label = styled.label`
  color: #9d9d9d;
  font-weight: bold;
  margin-top: 20px;
`;

export const Input = styled.input`
  height: 35px;
  border: none;
  border-radius: 0;
  border-bottom: 2px solid #ebebeb;
  width: 100%;
  &:focus {
    outline: 0;
  }
`;

export const TextSubtitle = styled.h2`
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 32px;
    margin-top: 20px;
  }
`;

export const TextParagrath = styled.p`
  color: #c1c1c1;
  text-align: end;
  margin-top: 20px;
`;

export const ButtonSubmit = styled.p`
  color: #b5c401;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  margin-top: 40px;
`;
