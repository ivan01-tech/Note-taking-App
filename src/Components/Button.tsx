import { MouseEventHandler } from "react";
import styles from "../Note.module.css";

type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  onClick: MouseEventHandler<HTMLButtonElement>;
  color?: string;
};

function Button({ onClick, color, children, ...rest }: Props) {
  const content = typeof children === "function" ? children() : children;

  return (
    <button
      className={`${styles.btn} ${color ? styles[color] : ""}  `}
      {...rest}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
