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
  register?: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  error?: string;
  styleOption?: "default" | "headless";
  className?: string;
  type?: string;
  children?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type TextareaProps = {
  register?: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  error?: string;
  styleOption?: "default" | "headless";
  className?: string;
  children?: ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type ButtonProps = {
  styleOption?: "default" | "headless";
  className?: string;
  children?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type UseFormReturn<T extends FormValues> = {
  register: (name: keyof T) => {
    name: keyof T;
    value: T[keyof T];
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };
  handleSubmit: (callback: (data: T) => void) => (e: React.FormEvent) => void;
  errors: Record<string, string>;
  values: T;
  reset: () => void;
  validate: () => boolean;
};
