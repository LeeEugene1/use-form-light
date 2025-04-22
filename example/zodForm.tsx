import { useCallback } from "react";
import { useForm } from "use-form-light";
import { Form, Input, Textarea, Button } from "use-form-light";
import { z } from "zod";

const useZodValidationResolver = (schema: z.ZodType<FormData>) =>
  useCallback(
    async (data: unknown) => {
      try {
        const values = await schema.parseAsync(data);
        return {
          values: values as FormData,
          errors: {},
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            values: data as FormData,
            errors: error.errors.reduce(
              (allErrors: Record<string, string>, currentError) => ({
                ...allErrors,
                [currentError.path[0]]: currentError.message,
              }),
              {}
            ),
          };
        }
        return {
          values: data as FormData,
          errors: { form: "An error occurred during validation" },
        };
      }
    },
    [schema]
  );

const validationSchema = z.object({
  name: z
    .string()
    .min(2, "이름은 2자 이상이어야 합니다ㅎㅎ")
    .nonempty("이름을 입력해주세요"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식이 아닙니다ㅎㅎ")
    .nonempty("이메일을 입력해주세요"),
  mobile: z.string(),
  gender: z.string(),
  agree: z.boolean(),
  message: z.string(),
});

type FormData = z.infer<typeof validationSchema> & {
  mobile: string;
  gender: string;
  agree: boolean;
  message: string;
};

function App() {
  const resolver = useZodValidationResolver(validationSchema);
  const { register, handleSubmit, errors, validate, reset } = useForm<FormData>(
    {
      defaultValues: {
        name: "",
        email: "",
        mobile: "",
        gender: "male",
        agree: false,
        message: "",
      },
      resolver,
    }
  );

  const onSubmit = (data: FormData) => {
    const isValid = validate();
    if (!isValid) {
      return;
    }
    console.log(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>use-form-light 테스트</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          이름:{" "}
          <Input
            register={register("name")}
            error={errors.name}
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          이메일:{" "}
          <Input
            register={register("email")}
            placeholder="이메일을 입력해주세요"
            error={errors.email}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          휴대폰번호:{" "}
          <Input
            type="number"
            register={register("mobile")}
            placeholder="휴대폰번호를 입력해주세요"
            error={errors.mobile}
          />
        </div>
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          성별:{" "}
          <div>
            <Input id="male" type="radio" register={register("gender")} />
            <label htmlFor="male">남성</label>
          </div>
          <div>
            <Input id="female" type="radio" register={register("gender")} />
            <label htmlFor="female">여성</label>
          </div>
        </div>
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <Input id="agree" type="checkbox" register={register("agree")} />
          <label htmlFor="agree">이용약관에 동의합니다</label>
        </div>

        <Textarea
          register={register("message")}
          error={errors.message}
          placeholder="메시지를 입력해주세요"
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Button type="submit">제출</Button>
          <Button type="button" onClick={reset}>
            초기화
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default App;
