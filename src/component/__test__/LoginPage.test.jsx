import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import LoginPage, { validateEmail } from "../LoginPage";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";

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
  // Kiểm tra function validate email nhập vào từ form
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

// Mock the axios module
jest.mock("axios");

describe("Test Login function with API mocking", () => {
  test("Login with valid email and API success", async () => {
    // Mock axios post để trả về phản hồi đăng nhập thành công
    axios.post.mockResolvedValueOnce({ data: { message: "Login successful" } });

    render(<LoginPage />);

    const email = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-btn");

    // Mô phỏng người dùng nhập email và mật khẩu
    await userEvent.type(email, "testuser@gmail.com");
    await userEvent.type(password, "password123");

    // Mô phỏng việc người dùng nhấn nút đăng nhập
    await userEvent.click(button);

    // Chờ mock axios giải quyết và kiểm tra xem đăng nhập có thành công không
    waitFor(async () => {
      // Kiểm tra axios.post được gọi với đúng tham số
      expect(axios.post).toHaveBeenCalledWith("/api/login", {
        email: "testuser@gmail.com",
        password: "password123",
      });
      const successfulMessage = await screen.findByText("Login successful");
      expect(successfulMessage).toBeInTheDocument();
    });
  });

  test("Login with valid email and API return Login failed", async () => {
    // Mock axios post để trả về lỗi đăng nhập
    axios.post.mockRejectedValueOnce(
      new Error("Login failed, please try again")
    );
    render(<LoginPage />);

    const email = screen.getByTestId("email-input");
    const password = screen.getByTestId("password-input");
    const button = screen.getByTestId("login-btn");

    // Mô phỏng người dùng nhập email và mật khẩu
    await userEvent.type(email, "testuser@gmail.com");
    await userEvent.type(password, "password123");

    // Mô phỏng việc người dùng nhấn nút đăng nhập
    await userEvent.click(button);

    // Chờ mock axios giải quyết và kiểm tra xem đăng nhập có thành công không
    waitFor(async () => {
      // Assert that axios.post was called with the correct arguments
      expect(axios.post).toHaveBeenCalledWith("/api/login", {
        email: "testuser@gmail.com",
        password: "wrongpassword",
      });
      const errorMessage = await screen.findByText(
        "Login failed, please try again"
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
