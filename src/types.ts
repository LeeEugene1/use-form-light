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

export type Resolver<T> = (data: T) => Promise<{
  values: T;
  errors: Record<string, string>;
}>;

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
  setValue: (name: keyof T, value: any) => void;
  reset: () => void;
  validate: () => Promise<boolean>;
  watch: (name?: keyof T) => T[keyof T] | T;
};

export type SelectProps = {
  register?: {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  error?: string;
  styleOption?: "default" | "headless";
  className?: string;
  children?: ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export type OptionProps = {
  children?: ReactNode;
} & React.OptionHTMLAttributes<HTMLOptionElement>;
