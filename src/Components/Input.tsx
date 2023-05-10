import React, { HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  titleRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  type?: string;
  value?: string;
}

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  bodyRef?: React.RefObject<HTMLTextAreaElement>;
  required?: boolean;
}

function Input({ value, titleRef, type, ...properties }: InputProps) {
  console.log(titleRef);
  return (
    <input
      {...properties}
      ref={titleRef ? titleRef : null}
      type={type ? type : "text"}
      value={value}
    />
  );
}

export function TextArea({ bodyRef, required, ...properties }: TextAreaProps) {
  console.log(bodyRef);

  return (
    <textarea
      ref={bodyRef ? bodyRef : null}
      required={required}
      {...properties}
    ></textarea>
  );
}

export default Input;
