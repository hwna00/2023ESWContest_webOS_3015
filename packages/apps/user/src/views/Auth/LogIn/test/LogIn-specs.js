import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import LogInPage from '../LogIn';

describe('Log-In', () => {
  test('Housepitaal 문구 뜸', () => {
    render(<LogInPage />, { wrapper: BrowserRouter });
    const msg = screen.getByText(/Housepital/i);
    expect(msg).toBeInTheDocument();
  });
  test('email 입력 폼', () => {
    render(<LogInPage />, { wrapper: BrowserRouter });
    const id = screen.getByPlaceholderText('email');
    expect(id).toBeInTheDocument();
  });
  test('pw 입력 폼', () => {
    render(<LogInPage />, { wrapper: BrowserRouter });
    const pw = screen.getByPlaceholderText('Password');
    expect(pw).toBeInTheDocument();
  });
  test('login 버튼', () => {
    render(<LogInPage />, { wrapper: BrowserRouter });
    const loginBtn = screen.getByRole('button', {
      name: /Login/i,
    });
    expect(loginBtn).toBeInTheDocument();
  });
  test('sign up 버튼', () => {
    render(<LogInPage />, { wrapper: BrowserRouter });
    const signupBtn = screen.getByRole('button', {
      name: /Sign Up/i,
    });
    expect(signupBtn).toBeInTheDocument();
  });
  test('비밀번호 잊어버림 링크', () => {
    render(<LogInPage />, { wrapper: BrowserRouter });
    const pwFinding = screen.getByRole('link', {
      name: /비밀번호를 잊어버리셨나요?/i,
    });
    expect(pwFinding).toBeInTheDocument();
  });
});
