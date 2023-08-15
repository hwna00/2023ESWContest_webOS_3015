import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../SignUp';

const testForm = {
  email: 'test@test.com',
  username: '하철환',
  password: '121212',
  checkPassword: '121212',
  birthDate: '2000-08-03',
  address: '주소',
  phoneNumber: '12345678',
};

describe('Test SignUp Page', () => {
  beforeEach(async () => {
    act(() => {
      render(<SignUp />, { wrapper: BrowserRouter });
    });
  });

  it('로그인화면으로 넘어가는 버튼이 존재하는가', () => {
    const loginBtn = screen.getByText(/로그인/i);
    expect(loginBtn).toBeInTheDocument();
  });

  it('필수 입력 요소를 모두 채웠을 때 정상적으로 최종화면으로 이동하는가', async () => {
    const email = screen.getByLabelText(/이메일/i);
    const name = screen.getByLabelText(/이름/i);
    const password = screen.getByPlaceholderText(/비밀번호/i);
    const checkPassword = screen.getByLabelText(/비밀번호 확인/i, {
      exact: true,
    });

    await waitFor(() => userEvent.type(email, testForm.email));
    await waitFor(() => userEvent.type(name, testForm.username));
    await waitFor(() => userEvent.type(password, testForm.password));
    await waitFor(() => userEvent.type(checkPassword, testForm.checkPassword));

    const nextBtn = screen.getByRole('button', { name: /다음으로/i });
    await act(() => {
      userEvent.click(nextBtn);
    });

    const birthDate = screen.getByLabelText(/생년월일/i);
    const address = screen.getByLabelText(/주소/i);
    const phoneNumber = screen.getByLabelText(/전화번호/i);

    await waitFor(() => userEvent.type(birthDate, testForm.birthDate));
    await waitFor(() => userEvent.type(address, testForm.address));
    await waitFor(() => userEvent.type(phoneNumber, testForm.phoneNumber));

    await act(() => userEvent.click(nextBtn));
    await act(() => userEvent.click(nextBtn));

    const submitBtn = screen.getByRole('button', { name: /가입하기/i });
    expect(submitBtn).toBeInTheDocument();
  });

  it.only('필수 입력 요소를 모두 채우지 않았을 때 에러 메시지가 보이는가', async () => {
    const nextBtn = screen.getByRole('button', { name: /다음으로/i });
    await act(() => userEvent.click(nextBtn));

    let errorMsg = screen.getAllByText(/이 항목은 필수입니다./i);
    expect(errorMsg.length).toBe(4);

    const email = screen.getByLabelText(/이메일/i);
    const name = screen.getByLabelText(/이름/i);
    const password = screen.getByPlaceholderText(/비밀번호/i);
    const checkPassword = screen.getByLabelText(/비밀번호 확인/i, {
      exact: true,
    });

    await waitFor(() => userEvent.type(email, testForm.email));
    await waitFor(() => userEvent.type(name, testForm.username));
    await waitFor(() => userEvent.type(password, testForm.password));
    await act(() => userEvent.type(checkPassword, testForm.checkPassword));

    await act(() => userEvent.click(nextBtn));

    await act(() => userEvent.click(nextBtn));
    errorMsg = screen.getAllByText(/이 항목은 필수입니다./i);
    expect(errorMsg.length).toBe(3);
  });
});
