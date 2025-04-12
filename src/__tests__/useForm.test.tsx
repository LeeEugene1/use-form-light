import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "../hooks/useForm";
import { Form } from "../components/Form";

describe("useForm", () => {
  let mockSubmit: jest.Mock;

  beforeEach(() => {
    mockSubmit = jest.fn();
  });

  const TestForm = () => {
    const { register, handleSubmit, errors } = useForm({
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
          <input {...register("name")} id="name" aria-label="name" />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input {...register("email")} id="email" aria-label="email" />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <button type="submit">제출</button>
      </Form>
    );
  };

  it("폼이 제대로 렌더링된다", () => {
    render(<TestForm />);
    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "제출" })).toBeInTheDocument();
  });

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

    // 이름이 2자 이상일 때
    fireEvent.change(nameInput, { target: { value: "ab" } });
    await waitFor(() => {
      expect(
        screen.queryByText("이름은 2자 이상이어야 합니다")
      ).not.toBeInTheDocument();
    });

    // 이메일 형식이 잘못되었을 때
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    await waitFor(() => {
      expect(
        screen.getByText("올바른 이메일 형식이 아닙니다")
      ).toBeInTheDocument();
    });

    // 이메일 형식이 올바를 때
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    await waitFor(() => {
      expect(
        screen.queryByText("올바른 이메일 형식이 아닙니다")
      ).not.toBeInTheDocument();
    });
  });

  it("폼 제출이 작동한다", async () => {
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
});
