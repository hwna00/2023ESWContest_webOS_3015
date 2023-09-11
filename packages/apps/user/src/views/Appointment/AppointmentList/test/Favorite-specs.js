import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';
import AppointmentList from '../AppointmentList';
import BackButton from '../../../../components/BackButton/BackButton';

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

describe('즐겨찾기 관리', () => {
  beforeEach(() => render(<AppointmentList />, { wrapper: BrowserRouter }));
  it('즐겨찾기 관리가 뜨는가', () => {
    const title = '즐겨찾기 관리';
    render(<BackButton title={title} />);

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  it('필터 적용 버튼이 뜨는가', () => {
    const buttonElement = screen.getByRole('button', { name: '필터적용' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('필터 적용 버튼 누르면 모달창 뜨는가', () => {
    const buttonElement = screen.getByRole('button', { name: '필터적용' });
    fireEvent.click(buttonElement);
    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toBeInTheDocument();
  });

  it('모든 과목 체크박스가 렌더링되는가', async () => {
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
