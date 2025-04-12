import { useState } from "react";

type ValidationRule = {
  pattern: RegExp;
  message: string;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule;
};

type FormState<T> = {
  values: T;
  errors: Record<string, string>;
};

export function useForm<T extends Record<string, any>>(options?: {
  defaultValues?: T;
  validationRules?: ValidationRules<T>;
}) {
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // 값 업데이트
      setFormState((prev) => ({
        ...prev,
        values: { ...prev.values, [name]: newValue },
      }));

      // 해당 필드의 validation rule이 있으면 즉시 검증
      const rule = options?.validationRules?.[name as keyof T];
      if (rule) {
        const isValid = rule.pattern.test(newValue);
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
    setFormState({
      values: options?.defaultValues ?? ({} as T),
      errors: {},
    });
  };

  const handleSubmit = (callback: (data: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      callback(formState.values);
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
