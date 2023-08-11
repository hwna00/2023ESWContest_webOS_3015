import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../SignUp';

describe('Test SignUp Page', () => {
  beforeEach(() => {
    render(<SignUp />, { wrapper: BrowserRouter });
  });

  test('로그인화면으로 넘어가는 버튼이 존재하는가', () => {
    const loginBtn = screen.getByText(/로그인/i);
    expect(loginBtn).toBeInTheDocument();
  });

  test('다음 버튼을 눌렀을 때 "이전으로" 버튼이 생성되는가', async () => {
    const nextBtn = screen.getByRole('button', { name: /다음으로/i });
    expect(nextBtn).toBeInTheDocument();
    await userEvent(nextBtn);
    const prevBtn = screen.getByRole('button', { name: /이전으로/i });
    expect(prevBtn).toBeInTheDocument();
  });

  test('회원가입 마지막 단계에서 "가입 완료" 버튼이 생성되는가', async () => {
    const nextBtn = screen.getByRole('button', { name: /다음으로/i });
    await userEvent(nextBtn);
    await userEvent(nextBtn);
    await userEvent(nextBtn);
    const submitBtn = screen.getByRole('button', { name: /가입 완료/i });
    expect(submitBtn).toBeInTheDocument();
  });
});
