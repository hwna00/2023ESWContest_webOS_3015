import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Doctor from '../Doctor';

const specialties = [
  '이비인후과',
  '안과',
  '내과',
  '피부과',
  '정형외과',
  '성형외과',
  '산부인과',
  '가정의학과',
  '정신과',
];

describe('의사별 보기', () => {
  test('의사별 보기 뜨는지', () => {
    render(<Doctor />, { wrapper: BrowserRouter });
    const headingElement = screen.getByText(/의사별 보기/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('필터 적용 버튼', () => {
    render(<Doctor />, { wrapper: BrowserRouter });
    const buttonElement = screen.getByRole('button', { name: '필터적용' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('필터 적용 버튼 누르면 모달창 뜨는지', () => {
    render(<Doctor />, { wrapper: BrowserRouter });
    const buttonElement = screen.getByRole('button', { name: '필터적용' });
    fireEvent.click(buttonElement);
    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toBeInTheDocument();
  });

  test('모든 과목 체크박스가 렌더링되는지', async () => {
    render(<Doctor />, { wrapper: BrowserRouter });
    const buttonElement = screen.getByRole('button', { name: '필터적용' });
    userEvent.click(buttonElement);
    await waitFor(() => {
      specialties.forEach(specialty => {
        const checkbox = screen.getAllByRole('checkbox', {
          name: specialty,
        });

        expect(checkbox[0]).toHaveAttribute('name', specialty);
      });
    });
  });
});
