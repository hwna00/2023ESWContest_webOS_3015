import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import MainPage from '../MainPage';

describe('Test Main Page', () => {
  beforeEach(() => render(<MainPage />, { wrapper: BrowserRouter }));

  it('사용자가 선택할 날짜에 따라 할 일 목록이 업데이트 되는가', () => {
    const todoTitle = screen.getByText(/오늘 할 일/i);
    expect(todoTitle).toBeInTheDocument();
  });

  it('푸시 알림이 정상적으로 보이는가', async () => {
    const notificationTitle = screen.getByText(/푸시 알림/i);
    expect(notificationTitle).toBeInTheDocument();

    await waitFor(() => userEvent.click(notificationTitle));
    const todoItem = screen.getByText(/병원 예약이 완료되었습니다/i);
    expect(todoItem).toBeInTheDocument();
  });

  it('편의 기능을 제공하는 버튼이 정상적으로 보이는가', () => {
    const callBtn = screen.getByRole('button', { name: /긴급 전화/i });
    const chatbotBtn = screen.getByRole('button', { name: /챗봇/i });

    expect(callBtn).toBeInTheDocument();
    expect(chatbotBtn).toBeInTheDocument();
  });
});
