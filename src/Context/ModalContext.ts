import React, { createContext, useState } from "react";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModals: boolean;
}
type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};
export const ModalContext = createContext<null | ModalProps>(null);

const ModalContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [showModals, setShowModal] = useState(false);
  const value = {
    showModals,
    setShowModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
