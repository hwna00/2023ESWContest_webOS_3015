import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Appointment from '../Appointment';

test('진행 현황 텍스트가 있다.', () => {
  render(<Appointment />);
  const txtProgress = screen.getByText('진행 현황');
  expect(txtProgress).toBeInTheDocument();
});

describe('즐겨찾기 컨텐츠가 뜬다', () => {
  beforeEach(() => {
    render(<Appointment />);
  });

  it('즐겨찾기 텍스트가 뜬다', () => {
    const txtFavorites = screen.getByText('즐겨찾기');
    expect(txtFavorites).toBeInTheDocument();
  });
  it('더보기 링크가 뜬다', () => {
    const btnShowMore = screen.getByRole('Button', { name: '더보기' });
    expect(btnShowMore).toBeInTheDocument();
  });
});

describe('병원별 보기 컨텐츠가 뜬다', () => {
  beforeEach(() => {
    render(<Appointment />);
  });

  it('병원별 보기 텍스트가 뜬다', () => {
    const txtHospital = screen.getByText('병원별 보기');
    expect(txtHospital).toBeInTheDocument();
  });
  it('더보기 링크가 뜬다', () => {
    const btnShowMore = screen.getByRole('Button', { name: '더보기' });
    expect(btnShowMore).toBeInTheDocument();
  });
});

describe('의사별 보기 컨텐츠가 뜬다', () => {
  beforeEach(() => {
    render(<Appointment />);
  });

  it('의사별 보기 텍스트가 뜬다', () => {
    const txtDoctor = screen.getByText('의사별 보기');
    expect(txtDoctor).toBeInTheDocument();
  });
  it('더보기 링크가 뜬다', () => {
    const btnShowMore = screen.getByRole('Button', { name: '더보기' });
    expect(btnShowMore).toBeInTheDocument();
  });
});
