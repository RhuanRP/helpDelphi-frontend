import type {
  ForwardRefRenderFunction,
  ReactNode,
  SelectHTMLAttributes,
} from "react";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: FieldError;
  name: string;
  children: ReactNode;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { label, error, name, children, ...rest },
  ref
) => {
  return (
    <div className="select-wrapper">
      <label className="form-label">{label}</label>
      <select
        name={name}
        ref={ref}
        className={`${error ? "error-select" : "primary-select"}`}
        {...rest}
      >
        {children}
      </select>
      {error?.message && <p className="error-message">{error?.message}</p>}
    </div>
  );
};

export const Select = forwardRef(SelectBase);
