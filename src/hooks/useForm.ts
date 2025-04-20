import { useState } from "react";
import {
  ValidationRules,
  FormValues,
  UseFormReturn,
} from "../types";

type FormState<T> = {
  values: T;
  errors: Record<string, string>;
};

type UseFormOptions<T extends FormValues> = {
  defaultValues?: T;
  validationRules?: ValidationRules<T>;
};

export const useForm = <T extends FormValues>({
  defaultValues: initialDefaultValues,
  validationRules,
}: UseFormOptions<T> = {}): UseFormReturn<T> => {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialDefaultValues ?? ({} as T),
    errors: {},
  });

  const register = (name: keyof T) => ({
    name,
    value: formState.values[name],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value, type, id } = e.target as HTMLInputElement;
      const checked = (e.target as HTMLInputElement).checked;

      if (type === "checkbox") {
        setFormState((prev) => ({
          ...prev,
          values: { ...prev.values, [name]: checked },
        }));
      } else if (type === "radio") {
        if (checked) {
          setFormState((prev) => ({
            ...prev,
            values: { ...prev.values, [name]: id },
          }));
        }
      } else {
        setFormState((prev) => ({
          ...prev,
          values: { ...prev.values, [name]: value },
        }));
      }

      // 해당 필드의 validation rule이 있으면 즉시 검증
      const rule = validationRules?.[name];
      if (rule) {
        const isValid = rule.pattern.test(value);
        setFormState((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            [name]: isValid ? "" : rule.message,
          },
        }));
      } else {
        // validation rule이 없으면 에러 초기화
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [name]: "" },
        }));
      }
    },
  });

  const watch = (name?: keyof T) => {
    if (name) {
      return formState.values[name];
    }
    return formState.values;
  };

  const handleSubmit = (callback: (data: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) {
        return;
      }
      callback(formState.values);
    };
  };

  const validate = () => {
    if (!validationRules) return true;

    let isValid = true;
    const newErrors: Record<string, string> = {};

    Object.entries(validationRules).forEach(([name, rule]) => {
      if (!rule) return;
      const value = formState.values[name as keyof T];
      const isValidField = rule.pattern.test(String(value));
      if (!isValidField) {
        isValid = false;
        newErrors[name] = rule.message;
      }
    });

    setFormState((prev) => ({
      ...prev,
      errors: newErrors,
    }));

    return isValid;
  };

  const setValue = (name: keyof T, value: any) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
    }));
  };

  const reset = () => {
    const defaultValues = initialDefaultValues ?? ({} as T);

    // 모든 input 요소를 찾아서 초기화
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      const name = input.name as keyof T;
      if (name) {
        if (input.type === "checkbox") {
          input.checked = Boolean(defaultValues[name]);
        } else if (input.type === "radio") {
          input.checked = input.id === defaultValues[name];
        }
      }
    });

    setFormState({
      values: defaultValues,
      errors: {},
    });
  };

  return {
    register,
    handleSubmit,
    errors: formState.errors,
    values: formState.values,
    setValue,
    reset,
    validate,
    watch,
  };
};
