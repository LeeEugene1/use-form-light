import { useForm } from "use-form-light";
import { Form, Input, Textarea, Button } from "use-form-light";

type FormData = {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  agree: boolean;
  message: string;
};

function App() {
  const { register, handleSubmit, errors, validate, reset, values, watch } =
    useForm<FormData>({
      defaultValues: {
        name: "",
        email: "",
        mobile: "",
        gender: "male",
        agree: false,
        message: "",
      },
      validationRules: {
        name: {
          pattern: /^.{2,}$/,
          message: "이름은 2자 이상이어야 합니다",
        },
        email: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "올바른 이메일 형식이 아닙니다",
        },
      },
    });

  const onSubmit = (data: FormData) => {
    const isValid = validate();
    if (!isValid) {
      return;
    }
    alert("제출되었습니다.");
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
            <Input
              id="male"
              type="radio"
              register={register("gender")}
              checked={watch("gender") === "male"}
            />
            <label htmlFor="male">남성</label>
          </div>
          <div>
            <Input
              id="female"
              type="radio"
              register={register("gender")}
              checked={watch("gender") === "female"}
            />
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

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Button type="submit" style={{ width: "50%" }}>
            제출
          </Button>
          <Button type="button" style={{ width: "50%" }} onClick={reset}>
            초기화
          </Button>
        </div>
      </Form>
      <div>
        <h2>Form Values</h2>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
