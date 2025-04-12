import { ReactNode } from "react";
import { z } from "zod";
export type FormValues = Record<string, any>;
export type FormErrors = Record<string, string>;
export type ValidationSchema = z.ZodSchema<any>;
export type ValidationRule = {
  pattern: RegExp;
  message: string;
};

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

export type FormProps<T> = {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
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
