import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "../hooks/useForm";
import { Form, Input } from "../components/Form";

describe("useForm", () => {
  let mockSubmit: jest.Mock;

  beforeEach(() => {
    mockSubmit = jest.fn();
  });

  const TestForm = () => {
    const { register, handleSubmit, errors, reset } = useForm({
      defaultValues: {
        name: "",
        email: "",
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

    return (
      <Form onSubmit={handleSubmit(mockSubmit)}>
        <div>
          <label htmlFor="name">이름</label>
          <Input register={register("name")} error={errors.name} />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <Input register={register("email")} error={errors.email} />
        </div>
        <button type="submit">제출</button>
        <button type="button" onClick={reset}>
          초기화
        </button>
      </Form>
    );
  };

  const TestFormWithoutValidation = () => {
    const { register, handleSubmit } = useForm({
      defaultValues: {
        name: "",
        email: "",
      },
    });

    return (
      <Form onSubmit={handleSubmit(mockSubmit)}>
        <div>
          <label htmlFor="name">이름</label>
          <Input register={register("name")} />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <Input register={register("email")} />
        </div>
        <button type="submit">제출</button>
      </Form>
    );
  };

  it("유효성 검사가 작동한다", async () => {
    render(<TestForm />);
    const nameInput = screen.getByLabelText("name");
    const emailInput = screen.getByLabelText("email");

    // 이름이 1자일 때
    fireEvent.change(nameInput, { target: { value: "a" } });
    await waitFor(() => {
      expect(
        screen.getByText("이름은 2자 이상이어야 합니다")
      ).toBeInTheDocument();
    });

    // 이메일 형식이 잘못되었을 때
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    await waitFor(() => {
      expect(
        screen.getByText("올바른 이메일 형식이 아닙니다")
      ).toBeInTheDocument();
    });
  });

  it("모든 값이 유효하면 폼 제출이 작동한다", async () => {
    render(<TestForm />);
    const nameInput = screen.getByLabelText("name");
    const emailInput = screen.getByLabelText("email");
    const submitButton = screen.getByRole("button", { name: "제출" });

    // 유효한 값 입력
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: "test",
        email: "test@example.com",
      });
    });
  });

  it("값이 하나라도 유효하지 않으면 폼 제출이 작동하지 않는다.", async () => {
    render(<TestForm />);
    const nameInput = screen.getByLabelText("name");
    const emailInput = screen.getByLabelText("email");
    const submitButton = screen.getByRole("button", { name: "제출" });

    // 유효하지 않은 이메일 입력
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    // 폼이 제출되지 않았는지 확인
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("초기화 버튼을 클릭하면 모든 값이 초기화 된다.", async () => {
    render(<TestForm />);
    const nameInput = screen.getByLabelText("name");
    const emailInput = screen.getByLabelText("email");
    const resetButton = screen.getByRole("button", { name: "초기화" });

    // 값 입력
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // 초기화 버튼 클릭
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
    });
  });

  it("validationRules가 없을 때 값이 하나라도 없더라도 폼 제출이 작동한다.", async () => {
    render(<TestFormWithoutValidation />);
    const nameInput = screen.getByLabelText("name");
    const emailInput = screen.getByLabelText("email");
    const submitButton = screen.getByRole("button", { name: "제출" });

    // 값 입력
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    // 폼이 제출되지 않았는지 확인
    expect(mockSubmit).toHaveBeenCalled();
  });
});
