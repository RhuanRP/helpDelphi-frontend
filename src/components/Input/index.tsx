import React from "react";
import "./styles.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ children, ...rest }: InputProps) {
  return (
    <input className="primary-input" {...rest}>
      {children}
    </input>
  );
}
