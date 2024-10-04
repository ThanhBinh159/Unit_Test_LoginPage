import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage, { validateEmail } from "../LoginPage";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Test LoginPage components", () => {
  test("Render the login form correctly", async () => {
    render(<LoginPage />);
    //tìm element được gắn data-testid là login-btn
    const loginButton = await screen.getByTestId("login-btn");
    //tìm element được gắn data-testid là email-input
    const emailInput = await screen.getByTestId("email-input");
    //tìm element được gắn data-testid là password-input
    const passwordInput = await screen.getByTestId("password-input");

    //kiểm tra 'LoginPage' có đủ những phần trên không
    expect(loginButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("Password have to has input type password", () => {
    render(<LoginPage />);
    const passwordField = screen.getByTestId("password-input");
    //kiểm tra ô nhập mật khẩu đã set-up đúng loại hay chưa
    expect(passwordField).toHaveAttribute("type", "password");
  });
});

describe("Test Validation Email functional", () => {
  //Kiểm tra function validate email nhập vào từ form
  test("should be failed on email validation with random string", () => {
    //thiết lập dữ liệu đầu vào cho function
    const randomString = "MailAoDemo";
    //khởi chạy function
    const testDemo = validateEmail(randomString);
    //kiểm tra kết quả trả về
    expect(testDemo).toBe(false);
  });

  test("should be failed on email validation with invalid email", () => {
    //thiết lập dữ liệu đầu vào cho function
    const wrongEmail = "MailAoDemo@mail.#com";
    //khởi chạy function
    const testDemo = validateEmail(wrongEmail);
    //kiểm tra kết quả trả về
    expect(testDemo).toBe(false);
  });

  test("should be passed on email validation with valid email", () => {
    //thiết lập dữ liệu đầu vào cho function
    const wrondEmail = "MailAoDemo@gmail.com";
    //khởi chạy function
    const testDemo = validateEmail(wrondEmail);
    //kiểm tra kết quả trả về
    expect(testDemo).toBe(true);
  });
});

describe("Test Login function", () => {
  test("Login with invalid email", async () => {
    render(<LoginPage />);
    const email = screen.getByTestId("email-input");
    const button = screen.getByTestId("login-btn");
    //giả lập hành động nhập email
    await userEvent.type(email, "se1858");
    //giả lập hành động nhấn login
    await userEvent.click(button);
    //kiểm tra thông báo lỗi nhận được
    const errorMessage = await screen.getByText("Please input a valid email");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Login without input anything", async () => {
    render(<LoginPage />);
    const email = screen.getByTestId("email-input");
    const button = screen.getByTestId("login-btn");
    //giả lập hành động nhấn login
    await userEvent.click(button);
    //kiểm tra thông báo lỗi nhận được
    const errorMessage = await screen.getByText(
      "Please input a email, can not empty"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("Login with valid email", async () => {
    render(<LoginPage />);
    const email = screen.getByTestId("email-input");
    const button = screen.getByTestId("login-btn");
    //giả lập hành động nhập email
    await userEvent.type(email, "se1858@gmail.com");
    //giả lập hành động nhấn login
    await userEvent.click(button);
    //kiểm tra thông báo lỗi nhận được
    const errorMessage =
      screen.queryAllByTestId("error-message").length > 0
        ? await screen.queryAllByTestId("error-message")
        : null;
    expect(errorMessage).not.toBeInTheDocument();
  });
});
