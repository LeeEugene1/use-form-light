import { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textareaContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  textarea: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minHeight: "100px",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.875rem",
  },
};
