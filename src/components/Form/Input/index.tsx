import React, { ForwardRefRenderFunction, forwardRef } from "react";
import "./styles.css";
import { FieldError } from "react-hook-form";
import cn from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  name: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, name, error, className, ...rest },
  ref
) => {
  return (
    <div className="input-wrapper">
      <label className="form-label">{label}</label>
      <input
        name={name}
        ref={ref}
        className={cn(className, error ? "error-input" : "primary-input")}
        {...rest}
      />
      {error?.message && <p className="error-message">{error?.message}</p>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
