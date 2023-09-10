import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppointmentDetail from '../AppointmentDetail';
import { BrowserRouter } from 'react-router-dom';

describe('Test Appointment Detail Page', () => {
  it('예약 메뉴에서 시간을 지정하지 않고 다음 단계를 눌렀을 때, 경고 메시지가 보여야 한다.', async () => {
    render(<AppointmentDetail />, { wrapper: BrowserRouter });

    const reservationBtn = screen.getByText('예약');
    await userEvent.click(reservationBtn);

    const alertMsg = '예약 시간을 설정해주세요';
    expect(alertMsg).toBeInTheDocument();
  });

  it('예약 메뉴에서 시간을 지정하지 않고 다음 단계를 눌렀을 때, 다음 예약 단계로 넘어가야 한다.', async () => {
    render(<AppointmentDetail />, { wrapper: BrowserRouter });

    const menu = screen.getByText('예약');
    userEvent.click(menu);

    const timeBtn = screen.getByRole('button', { name: /12:00/i });
    userEvent.click(timeBtn);

    const nextBtn = screen.getByRole('button', { name: /예약하기/i });
    userEvent.click(nextBtn);

    const alertMsg = '예약 시간을 설정해주세요';
    expect(alertMsg).not.toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /예약하기/i }),
      ).not.toBeInTheDocument();
    });
  });
});
