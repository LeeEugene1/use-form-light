import React from "react";
import styles from "./Form.module.css";
import { FormProps, InputProps, TextareaProps, ButtonProps } from "../types";

const Input: React.FC<InputProps & ButtonProps> = ({
  register,
  error,
  styleOption = "default",
  className = "",
  type = "text",
  children,
  ...props
}) => {
  return (
    <div className={styleOption === "default" ? styles.inputContainer : ""}>
      {children && <label htmlFor={register?.name}>{children}</label>}
      <input
        id={register?.name}
        type={type}
        {...register}
        className={`${
          styleOption === "default" ? styles.input : ""
        } ${className}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

const Textarea: React.FC<TextareaProps> = ({
  register,
  error,
  styleOption = "default",
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={styleOption === "default" ? styles.textareaContainer : ""}>
      {children && <label htmlFor={register?.name}>{children}</label>}
      <textarea
        id={register?.name}
        {...register}
        className={`${
          styleOption === "default" ? styles.textarea : ""
        } ${className}`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

const Button: React.FC<ButtonProps> = ({
  styleOption = "default",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      className={`${
        styleOption === "default" ? styles.button : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Form = <T extends Record<string, any>>({
  children,
  onSubmit,
  styleOption = "default",
  className = "",
}: FormProps<T>) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${styleOption === "default" ? styles.form : ""} ${className}`}
    >
      {children}
    </form>
  );
};

export { Input, Textarea, Button };
