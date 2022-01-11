import React from "react";
import { TextSubtitle, CardContainer } from "./styles";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  title: string;
  textRedirect: string;
  arrowLeft: boolean;
  url: string;
};

const Card = ({ children, title, textRedirect, arrowLeft, url }: Props) => {
  return (
    <>
      <TextSubtitle>{title}</TextSubtitle>
      <CardContainer>{children}</CardContainer>
      <TextSubtitle>
        <Link to={url}>
          {arrowLeft && <HiOutlineArrowLeft />}
          {textRedirect} {!arrowLeft && <HiOutlineArrowRight />}
        </Link>
      </TextSubtitle>
    </>
  );
};
export default Card;
