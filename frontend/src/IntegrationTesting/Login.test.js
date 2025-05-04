import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import * as auth from '../utils/auth';
import '@testing-library/jest-dom';

// Mock navigation and auth functions
const mockSetIsAuthenticated = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../utils/auth', () => ({
  loginUser: jest.fn(),
}));

describe('Login Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('successful login redirects to home', async () => {
    // Arrange
    auth.loginUser.mockReturnValue(true);
    
    // Act
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Your explorer name'), {
      target: { value: 'astronaut' }
    });
    fireEvent.change(screen.getByPlaceholderText('Your secret passcode'), {
      target: { value: 'moonwalk' }
    });
    fireEvent.click(screen.getByRole('button', { name: /launch dashboard/i }));

    // Assert
    await waitFor(() => {
      expect(auth.loginUser).toHaveBeenCalledWith('astronaut', 'moonwalk', false);
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('failed login shows error message', async () => {
    // Arrange
    auth.loginUser.mockReturnValue(false);
    
    // Act
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Your explorer name'), {
      target: { value: 'wronguser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Your secret passcode'), {
      target: { value: 'wrongpass' }
    });
    fireEvent.click(screen.getByRole('button', { name: /launch dashboard/i }));

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials - try again space explorer/i)).toBeVisible();
      expect(mockSetIsAuthenticated).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('"Remember me" is passed to login function', async () => {
    // Arrange
    auth.loginUser.mockReturnValue(true);
    
    // Act
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Your explorer name'), {
      target: { value: 'astronaut' }
    });
    fireEvent.change(screen.getByPlaceholderText('Your secret passcode'), {
      target: { value: 'moonwalk' }
    });
    fireEvent.click(screen.getByLabelText('Remember me'));
    fireEvent.click(screen.getByRole('button', { name: /launch dashboard/i }));

    // Assert
    await waitFor(() => {
      expect(auth.loginUser).toHaveBeenCalledWith('astronaut', 'moonwalk', true);
    });
  });

  test('registration link navigates to register page', () => {
    // Act
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    const registerLink = screen.getByRole('link', { name: /create account/i });
    
    // Assert
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
