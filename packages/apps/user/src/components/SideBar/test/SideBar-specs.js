import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from '../SideBar';
import { RouterProvider } from 'react-router-dom';
import router from '../../../router';

const menuNames = [
  '메인 화면',
  '진료 예약',
  '진료 내역',
  '건강 기록',
  '복약 관리',
];

//TODO: 로그인 하지 않은 경우 기본 프로필을 보여준다.
//TODO: 로그인 했지만 이미지가 없는 경우, 기본 프로필을 보여준다.
//TODO: 로그인했고 이미지가 있다면, 기본 아이콘 대신 이미지를 보여준다.
describe('Test SideBar Component', () => {
  beforeEach(() => {
    render(
      <RouterProvider router={router}>
        <SideBar />
      </RouterProvider>,
    );
  });
  it('프로필 생성', () => {
    const profileButton = screen.getByText(/.*님/i);
    expect(profileButton).toBeInTheDocument();
    expect(profileButton).tohave;
  });

  it('메뉴 항목 생성', () => {
    menuNames.forEach(menuName => {
      const menuItem = screen.getByText(menuName);
      expect(menuItem).toBeInTheDocument();
    });
  });

  it('세팅 버튼 생성', () => {
    const settingButton = screen.getByRole('button', { name: /환경 설정/i });
    expect(settingButton).toBeInTheDocument();
  });
});
