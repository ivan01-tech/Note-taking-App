import { MouseEventHandler } from "react";
import styles from "../Note.module.css";

type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

function Button({ onClick, color, type, children, ...rest }: Props) {
  const content = typeof children === "function" ? children() : children;

  return (
    <button
      className={`${styles.btn} ${color ? styles[color] : ""}  `}
      {...rest}
      onClick={onClick}
      type={`${type ? type : "button"}`}
    >
      {content}
    </button>
  );
}

export default Button;
