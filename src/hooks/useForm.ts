import { useState } from "react";
import { ValidationRules, FormValues, UseFormReturn, Resolver } from "../types";

type FormState<T> = {
  values: T;
  errors: Record<string, string>;
};

type UseFormOptions<T extends FormValues> = {
  defaultValues?: T;
  validationRules?: ValidationRules<T>;
  resolver?: Resolver<T>;
};

export const useForm = <T extends FormValues>({
  defaultValues: initialDefaultValues,
  validationRules,
  resolver,
}: UseFormOptions<T> = {}): UseFormReturn<T> => {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialDefaultValues ?? ({} as T),
    errors: {},
  });

  const validate = async () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (resolver) {
      try {
        const result = await resolver(formState.values);
        setFormState((prev) => ({
          ...prev,
          errors: result.errors,
        }));
        return Object.keys(result.errors).length === 0;
      } catch (error) {
        console.error("Validation error:", error);
        return false;
      }
    }

    if (validationRules) {
      Object.entries(formState.values).forEach(([key, value]) => {
        const rule = validationRules[key];
        if (rule && !rule.pattern.test(String(value))) {
          newErrors[key] = rule.message;
          isValid = false;
        }
      });
    }

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

      if (resolver || validationRules?.[name]) {
        validate();
      } else {
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

  const handleSubmit = (callback: (data: T) => void) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();
      const isValid = await validate();
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
    setValue,
    reset,
    validate,
    watch,
  };
};
