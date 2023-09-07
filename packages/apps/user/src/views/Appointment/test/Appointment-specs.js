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

describe('즐겨찾기 컨텐츠가 뜬다', () => {
  beforeEach(() => {
    render(<Appointment />, { wrapper: BrowserRouter });
  });

  it('즐겨찾기 텍스트가 뜬다', () => {
    const txtFavorites = screen.getByText('즐겨찾기');
    expect(txtFavorites).toBeInTheDocument();
  });
});

describe('병원별 보기 컨텐츠가 뜬다', () => {
  beforeEach(() => {
    render(
      <AppointmentViewList type={'hospital'} information={testHospitalInfo} />,
      { wrapper: BrowserRouter },
    );
  });

  it('병원별 보기 텍스트가 뜬다', () => {
    const txtHospital = screen.getByText('병원별 보기');
    expect(txtHospital).toBeInTheDocument();
  });
  it('더보기 링크가 뜬다', () => {
    const btnShowMore = screen.getByRole('link', { name: '+ 더보기' });
    expect(btnShowMore).toHaveAttribute('href', '/appointment/hospitals');
  });
});

describe('의사별 보기 컨텐츠가 뜬다', () => {
  beforeEach(() => {
    render(
      <AppointmentViewList type={'doctor'} information={testDoctorInfo} />,
      {
        wrapper: BrowserRouter,
      },
    );
  });

  it('의사별 보기 텍스트가 뜬다', () => {
    const txtDoctor = screen.getByText('의사별 보기');
    expect(txtDoctor).toBeInTheDocument();
  });
  it('더보기 링크가 뜬다', () => {
    const btnShowMore = screen.getByRole('link', { name: '+ 더보기' });
    expect(btnShowMore).toHaveAttribute('href', '/appointment/doctors');
  });
});
