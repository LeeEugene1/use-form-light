import { ReactNode } from "react";

export type ValidationRule = {
  pattern: RegExp;
  message: string;
};

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

export type FormValues = Record<string, any>;

export type FormProps<T extends FormValues> = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  styleOption?: "default" | "headless";
  className?: string;
};

export type InputProps = {
  register: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  error?: string;
  styleOption?: "default" | "headless";
  className?: string;
};
