import { useContext } from "react";
import { ModalContext } from "../Context/ModalContext";

export const useModal = function () {
  return useContext(ModalContext);
};
