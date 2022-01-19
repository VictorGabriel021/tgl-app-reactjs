import { useDispatch } from "react-redux";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineWarning } from "react-icons/ai";

import { CloseIcon, WarningIcon, Button } from "./styles";

import Modal from "@core/components/Modal";

import { removeFromCart } from "@store/cartSlice";

type Props = {
  onClose: () => void;
  id: number;
  price: number;
};

const RemoveItemModal = ({ id, price, onClose }: Props) => {
  const dispatch = useDispatch();

  const removeHandler = () => {
    dispatch(removeFromCart({ id, price }));
  };

  return (
    <Modal onClose={onClose}>
      <CloseIcon onClick={onClose}>
        <AiOutlineCloseCircle />
      </CloseIcon>
      <div className="text-center">
        <WarningIcon>
          <AiOutlineWarning />
        </WarningIcon>
        <h1>Você realmente deseja excluir este item ?</h1>
        <div className="mt-5">
          <Button className="btn btn-primary" onClick={removeHandler}>
            Remover
          </Button>
          <Button className="btn btn-danger ms-3" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveItemModal;
