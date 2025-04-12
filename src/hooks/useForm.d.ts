import { ChangeEvent, FormEvent } from "react";

export declare function useForm<T extends Record<string, any>>(options?: {
  defaultValues?: T;
  validationSchema?: any;
}): {
  register: (name: keyof T) => {
    name: keyof T;
    value: T[keyof T];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  handleSubmit: (callback: (data: T) => void) => (e: FormEvent) => void;
  errors: Record<string, string>;
  isDirty: boolean;
  values: T;
};
