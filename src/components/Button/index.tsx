import React from "react";
import "./styles.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button className="primary-button" {...rest}>
      {children}
    </button>
  );
}
