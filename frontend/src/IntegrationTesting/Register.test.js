import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import * as auth from "../utils/auth";
import "@testing-library/jest-dom";

// Mock dependencies
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../utils/auth", () => ({
  registerUser: jest.fn(),
}));

// Mock window.alert
const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

describe("Register Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("successful registration navigates to login", async () => {
    // Arrange
    auth.registerUser.mockReturnValue(true);

    // Act
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Choose your explorer name"), {
      target: { value: "spaceExplorer123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Create a secret passcode"), {
      target: { value: "Galaxy123!" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /launch exploration/i })
    );

    // Assert
    await waitFor(() => {
      expect(auth.registerUser).toHaveBeenCalledWith(
        "spaceExplorer123",
        "Galaxy123!",
        "default"
      );
      expect(mockAlert).toHaveBeenCalledWith(
        "Welcome spaceExplorer123! Your default avatar is ready."
      );
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  

  test("login link navigates to correct route", () => {
    // Act
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const loginLink = screen.getByRole("link", { name: /sign in/i });

    // Assert
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
