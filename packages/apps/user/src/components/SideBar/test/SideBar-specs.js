import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import SideBar from '../SideBar';

const menuNames = [
  '메인 화면',
  '진료 예약',
  '진료 내역',
  '건강 기록',
  '복약 관리',
];

const user = {
  name: '하철환',
  img: 'https://www.marthastewart.com/thmb/g-FunKfdiZombJQ7pB4wb8BF4C8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cat-kitten-138468381-4cd82b91d7be45cb9f9aa8366e10bce4.jpg',
};

describe('Test SideBar Component', () => {
  it('로그인 중인 경우 이름을 생성', () => {
    render(<SideBar user={user} />, { wrapper: BrowserRouter });
    const profileName = screen.getByText(/.*님/i);
    expect(profileName).toBeInTheDocument();
  });

  it('로그인 하지 않은 경우 프로필 대신 로그인 버튼 생성', () => {
    render(<SideBar />, { wrapper: BrowserRouter });
    const loginButton = screen.getByText(/로그인하기/i);
    expect(loginButton).toBeInTheDocument();
  });

  it('메뉴 항목 생성', () => {
    render(<SideBar />, { wrapper: BrowserRouter });
    menuNames.forEach(menuName => {
      const menuItem = screen.getByText(menuName);
      expect(menuItem).toBeInTheDocument();
    });
  });

  it('세팅 버튼 생성', () => {
    render(<SideBar />, { wrapper: BrowserRouter });
    const settingButton = screen.getByRole('button', { name: /환경 설정/i });
    expect(settingButton).toBeInTheDocument();
  });
});
