import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import AppointmentList from '../AppointmentList';

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

describe('병원별 보기', () => {
  it('병원별 보기 뜨는가', () => {
    render(<AppointmentList />, { wrapper: BrowserRouter });
    const headingElements = screen.getAllByText(/병원별 보기/i);
    expect(headingElements.length).toBeGreaterThan(0);
  });

  it('필터 적용 버튼이 뜨는가', () => {
    render(<AppointmentList />, { wrapper: BrowserRouter });
    const buttonElement = screen.getByRole('button', { name: '필터적용' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('필터 적용 버튼 누르면 모달창 뜨는가', () => {
    render(<AppointmentList />, { wrapper: BrowserRouter });
    const buttonElement = screen.getByRole('button', { name: '필터적용' });
    fireEvent.click(buttonElement);
    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toBeInTheDocument();
  });

  it('모든 과목 체크박스가 렌더링되는가', async () => {
    render(<AppointmentList />, { wrapper: BrowserRouter });
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
