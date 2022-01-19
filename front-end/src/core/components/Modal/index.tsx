import React from "react";
import ReactDOM from "react-dom";

import { Backdrop, Container, Content } from "./styles";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, onClose }: Props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClose} />,
        portalElement as HTMLElement
      )}
      {ReactDOM.createPortal(
        <Container>
          <Content>{children}</Content>
        </Container>,
        portalElement as HTMLElement
      )}
    </>
  );
};

export default Modal;
