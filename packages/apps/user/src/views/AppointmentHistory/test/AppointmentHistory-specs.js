import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import AppointmentHistory from '../AppointmentHistory';

describe('각 항목이 뜬다', () => {
  it('진료 일시가 뜬다', () => {
    render(<AppointmentHistory />, { wrapper: BrowserRouter });
    const txtPrescriptionDate = screen.getByText('진료 일시');
    expect(txtPrescriptionDate).toBeInTheDocument();
  });
  it('진료 병원이 뜬다', () => {
    render(<AppointmentHistory />, { wrapper: BrowserRouter });
    const txtHospitalName = screen.getByText('진료 병원');
    expect(txtHospitalName).toBeInTheDocument();
  });
  it('제조 약국이 뜬다', () => {
    render(<AppointmentHistory />, { wrapper: BrowserRouter });
    const txtPharmacyName = screen.getByText('제조 약국');
    expect(txtPharmacyName).toBeInTheDocument();
  });
});
