import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppointmentHistory from '../AppointmentHistory';

describe('각 항목이 뜬다', () => {
  it('처방 일시가 뜬다', () => {
    render(<AppointmentHistory />);
    const txtPrescriptionDate = screen.getByText('처방 일시');
    expect(txtPrescriptionDate).toBeInTheDocument();
  });
  it('진료 병원이 뜬다', () => {
    render(<AppointmentHistory />);
    const txtHospitalName = screen.getByText('진료 병원');
    expect(txtHospitalName).toBeInTheDocument();
  });
  it('제조 약국이 뜬다', () => {
    render(<AppointmentHistory />);
    const txtPharmacyName = screen.getByText('제조 약국');
    expect(txtPharmacyName).toBeInTheDocument();
  });
  it('즐겨찾기가 뜬다', () => {
    render(<AppointmentHistory />);
    const txtFavorites = screen.getByText('즐겨찾기');
    expect(txtFavorites).toBeInTheDocument();
  });
});
