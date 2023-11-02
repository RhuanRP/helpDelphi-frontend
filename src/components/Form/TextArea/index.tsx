import type { ForwardRefRenderFunction, TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";
import "./styles.css";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  name: string;
}

const TextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextAreaProps
> = ({ label, error, name, ...rest }, ref) => {
  return (
    <div className="textarea-wrapper">
      <label className="form-label">{label}</label>
      <textarea
        name={name}
        ref={ref}
        className={`${error ? "error-textarea" : "primary-textarea"}`}
        {...rest}
      />
      {error?.message && <p className="error-message">{error?.message}</p>}
    </div>
  );
};

export const TextArea = forwardRef(TextAreaBase);
