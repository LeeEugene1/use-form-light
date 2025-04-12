import { FormProps, InputProps, FormValues } from "../types";

export function Form<T extends FormValues>({
  children,
  onSubmit,
  styleOption = "default",
  className,
}: FormProps<T>) {
  return (
    <form
      onSubmit={onSubmit}
      className={`${styleOption === "default" ? "form-default" : ""} ${
        className || ""
      }`}
    >
      {children}
    </form>
  );
}

export function Input({
  register,
  error,
  styleOption = "default",
  className,
}: InputProps) {
  return (
    <div>
      <input
        {...register}
        className={`${styleOption === "default" ? "input-default" : ""} ${
          className || ""
        }`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
