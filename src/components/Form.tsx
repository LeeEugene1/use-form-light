import React from "react";
import { styles } from "./Form.css";
import type { FormProps, InputProps, TextareaProps, ButtonProps, SelectProps, OptionProps } from "../types";

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
    <div style={styleOption === "default" ? styles.inputContainer : undefined}>
      <input
        id={register?.name}
        type={type}
        {...register}
        style={styleOption === "default" ? styles.input : undefined}
        className={className}
        {...props}
      />
      {error && <span style={styles.error}>{error}</span>}
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
    <div
      style={styleOption === "default" ? styles.textareaContainer : undefined}
    >
      <textarea
        id={register?.name}
        {...register}
        style={styleOption === "default" ? styles.textarea : undefined}
        className={className}
        {...props}
      />
      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
};

const Select: React.FC<SelectProps> = ({
  register,
  error,
  styleOption = "default",
  className = "",
  children,
  ...props
}) => {
  return (
    <div style={styleOption === "default" ? styles.selectContainer : undefined}>
      <select
        id={register?.name}
        {...register}
        style={styleOption === "default" ? styles.select : undefined}
        className={className}
        {...props}
      >
        {children}
      </select>
      {error && <span style={styles.error}>{error}</span>}
    </div>
  );
};

const Option: React.FC<OptionProps> = ({
  children,
  ...props
}) => {
  return <option {...props}>{children}</option>;
};

const Button: React.FC<ButtonProps> = ({
  styleOption = "default",
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      style={styleOption === "default" ? styles.button : undefined}
      className={className}
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
      style={styleOption === "default" ? styles.form : undefined}
      className={className}
    >
      {children}
    </form>
  );
};

export { Input, Textarea, Button, Select, Option };
