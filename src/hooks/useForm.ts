import { useState } from "react";
import {
  ValidationRule,
  ValidationRules,
  FormValues,
  UseFormReturn,
} from "../types";

type FormState<T> = {
  values: T;
  errors: Record<string, string>;
};

export function useForm<T extends FormValues>(options?: {
  defaultValues?: T;
  validationRules?: ValidationRules<T>;
}): UseFormReturn<T> {
  const [formState, setFormState] = useState<FormState<T>>({
    values: options?.defaultValues ?? ({} as T),
    errors: {},
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // validationRules 검사
    if (options?.validationRules) {
      Object.entries(formState.values).forEach(([key, value]) => {
        const rule = options.validationRules?.[key];
        if (rule && !rule.pattern.test(String(value))) {
          newErrors[key] = rule.message;
          isValid = false;
        }
      });
    }

    // 기존 errors와 새로운 errors를 병합
    setFormState((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...newErrors },
    }));

    return isValid;
  };

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
      const rule = options?.validationRules?.[name];
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

  const reset = () => {
    const defaultValues = options?.defaultValues ?? ({} as T);

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

  const handleSubmit = (callback: (data: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();

      // 폼 유효성 검사
      const isValid = validate();

      // 유효성 검사 통과 시에만 콜백 실행
      if (isValid) {
        callback(formState.values);
      }
    };
  };

  return {
    register,
    handleSubmit,
    errors: formState.errors,
    values: formState.values,
    reset,
    validate,
  };
}
