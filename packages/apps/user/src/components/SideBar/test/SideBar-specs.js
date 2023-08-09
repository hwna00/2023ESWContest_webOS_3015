import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import SideBar from '../SideBar';

const menuNames = [
  '메인 화면',
  '진료 예약',
  '진료 내역',
  '건강 기록',
  '복약 관리',
];

describe('Test SideBar Component', () => {
  it('프로필 생성', () => {
    render(<SideBar />);
    const profileButton = screen.getByRole('button', { name: /.*님/i });
    expect(profileButton).toBeInTheDocument();
    expect(profileButton).tohave;
  });

  it('메뉴 항목 생성', () => {
    render(<SideBar />);
    menuNames.forEach(menuName => {
      const menuItem = screen.getByText(menuName);
      expect(menuItem).toBeInTheDocument();
    });
  });

  it('세팅 버튼 생성', () => {
    render(<SideBar />);
    const settingButton = screen.getByRole('button', { name: /환경 설정/i });
    expect(settingButton).toBeInTheDocument();
  });
});
