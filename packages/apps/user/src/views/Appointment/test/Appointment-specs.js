import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Appointment from '../Appointment';
import AppointmentViewList from '../../../components/AppointmentViewList/AppointmentViewList';
import { BrowserRouter } from 'react-router-dom';

const testHospitalInfo = [
  {
    hospitalKey: 0,
    name: '지웅병원',
    isOpen: true,
    rating: 5.0,
    numberOfRatings: 30,
    specialities: ['이비인후과', '성형외과'],
  },
];

const testDoctorInfo = [
  {
    hospitalKey: 0,
    name: '양지웅',
    isOpen: true,
    rating: 5.0,
    numberOfRatings: 30,
    specialities: ['이비인후과', '성형외과'],
  },
];

test('진행 현황 텍스트가 있다.', () => {
  render(<Appointment />, { wrapper: BrowserRouter });
  const txtProgress = screen.getByText('진행 현황');
  expect(txtProgress).toBeInTheDocument();
});

describe('필요한 컨텐츠가 렌더링 된다', () => {
  it('즐겨찾기 텍스트가 뜬다', () => {
    render(<Appointment />, { wrapper: BrowserRouter });
    const txtFavorites = screen.getByText('즐겨찾기');
    expect(txtFavorites).toBeInTheDocument();
  });

  it('병원별 보기 텍스트가 뜬다', () => {
    render(
      <AppointmentViewList type={'hospital'} information={testHospitalInfo} />,
      { wrapper: BrowserRouter },
    );
    const txtHospital = screen.getByText('병원별 보기');
    expect(txtHospital).toBeInTheDocument();
  });

  it('병원별 보기 더보기 링크가 뜬다', () => {
    render(
      <AppointmentViewList type={'hospital'} information={testHospitalInfo} />,
      { wrapper: BrowserRouter },
    );
    const btnShowMore = screen.getByRole('link', { name: '+ 더보기' });
    expect(btnShowMore).toHaveAttribute('href', '/appointment/hospitals');
  });

  it('의사별 보기 텍스트가 뜬다', () => {
    render(
      <AppointmentViewList type={'doctor'} information={testDoctorInfo} />,
      {
        wrapper: BrowserRouter,
      },
    );
    const txtDoctor = screen.getByText('의사별 보기');
    expect(txtDoctor).toBeInTheDocument();
  });

  it('의사별 보기 더보기 링크가 뜬다', () => {
    render(
      <AppointmentViewList type={'doctor'} information={testDoctorInfo} />,
      {
        wrapper: BrowserRouter,
      },
    );
    const btnShowMore = screen.getByRole('link', { name: '+ 더보기' });
    expect(btnShowMore).toHaveAttribute('href', '/appointment/doctors');
  });
});
