import React, { createContext, useState } from "react";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModals: boolean;
  toogleModal: (value?: boolean) => void;
}
type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};
/**
 * the modal context
 */
export const ModalContext = createContext<null | ModalProps>(null);

const ModalContextProvider = ({ children }: Props) => {
  // state to show or hide modal
  const [showModals, setShowModal] = useState(false);
  /**
   * a function which help to toogle the modals state
   * @param value
   */
  const toogleModal = function (value?: boolean) {
    setShowModal((prev) => (value ? value : !prev));
  };

  const value = {
    showModals,
    setShowModal,
    toogleModal,
  };
  return (
    <ModalContext.Provider value={value}>
      <>{children}</>
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
