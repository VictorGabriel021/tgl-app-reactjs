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

export const TextParagrath = styled.p`
  color: #c1c1c1;
  text-align: end;
  margin-top: 20px;
  a {
    text-decoration: none;
    color: unset;
  }
  &:hover {
    color: #a19c9c;
  }
`;

export const TextCenter = styled.div`
  text-align: center;
`;

export const ButtonSubmit = styled.button`
  color: #b5c401;
  font-size: 35px;
  font-weight: bold;
  background-color: #fff;
  border: none;

  &:hover {
    color: #98a312;
  }
`;

export const ErrorMessage = styled.span`
  color: #ff5757;
  margin-left: 10px;
`;
