import { useForm } from "use-form-light";
import { Form, Input, Textarea, Button, Select, Option } from "use-form-light";

type FormData = {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  agree: boolean;
  message: string;
};

function App() {
  const {
    register,
    handleSubmit,
    errors,
    validate,
    reset,
    values,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      gender: "",
      agree: false,
      message: "",
    },
    validationRules: {
      name: {
        pattern: /^.{2,}$/,
        message: "required 2 characters",
      },
    },
  });

  const onSubmit = (data: FormData) => {
    const isValid = validate();
    if (!isValid) {
      return;
    }
    alert("submit success.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>use-form-light 테스트</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          Name:{" "}
          <Input
            register={register("name")}
            error={errors.name}
            placeholder="name"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email:</label>
          <Input
            register={register("email")}
            placeholder="email"
            error={errors.email}
          />
          <Select
            name="email"
            id="email"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const combinedEmail =
                watch("email").split("@")[0] + e.target.value;
              setValue("email", combinedEmail);
            }}
          >
            <Option value="">Custom</Option>
            <Option value="@naver.com">naver.com</Option>
            <Option value="@gmail.com">gmail.com</Option>
            <Option value="@hanmail.net">hanmail.net</Option>
            <Option value="@kakao.com">kakao.com</Option>
            <Option value="@nate.com">nate.com</Option>
            <Option value="@yahoo.com">yahoo.com</Option>
            <Option value="@hotmail.com">hotmail.com</Option>
          </Select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          Mobile:{" "}
          <Input
            type="number"
            register={register("mobile")}
            placeholder="mobile"
            error={errors.mobile}
          />
        </div>
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          Gender:{" "}
          <div>
            <Input
              id="male"
              type="radio"
              register={register("gender")}
              checked={watch("gender") === "male"}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <Input
              id="female"
              type="radio"
              register={register("gender")}
              checked={watch("gender") === "female"}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <Input id="agree" type="checkbox" register={register("agree")} />
          <label htmlFor="agree">agree to terms</label>
        </div>

        <Textarea
          register={register("message")}
          error={errors.message}
          placeholder="message"
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Button type="submit" style={{ width: "50%" }}>
            Submit
          </Button>
          <Button type="button" style={{ width: "50%" }} onClick={reset}>
            Reset
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
