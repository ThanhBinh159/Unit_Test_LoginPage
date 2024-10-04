// src/App.test.jsx
import React from "react";
import { render } from "@testing-library/react";
import App from "./App"; // Adjust the path based on your project structure
import "@testing-library/jest-dom";

describe("Simple Test", () => {
  test("Test testing enviroment and the testing function without error", () => {
    expect(true).toBe(true);
  });
});
