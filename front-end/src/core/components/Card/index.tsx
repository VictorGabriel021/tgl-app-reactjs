import React from "react";
import { TextMain, TextRedirect, CardContainer } from "./styles";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  title: string;
  textRedirect: string;
  arrowLeft: boolean;
  urlRedirect: string;
};

const Card = ({ children, title, textRedirect, arrowLeft, urlRedirect }: Props) => {
  return (
    <>
      <TextMain>{title}</TextMain>
      <CardContainer>{children}</CardContainer>
      <TextRedirect>
        <Link to={urlRedirect}>
          {arrowLeft && <HiOutlineArrowLeft />}
          {textRedirect} {!arrowLeft && <HiOutlineArrowRight />}
        </Link>
      </TextRedirect>
    </>
  );
};
export default Card;
