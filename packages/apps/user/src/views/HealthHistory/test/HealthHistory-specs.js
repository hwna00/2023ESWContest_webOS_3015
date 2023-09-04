import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HealthHistory from '../HealthHistory';

describe('건강 데이터가 뜬다', () => {
  beforeEach(() => {
    render(<HealthHistory />);
  });

  it('심박수가 뜬다', () => {
    const txtHeartRate = screen.getByText('심박수');
    expect(txtHeartRate).toBeInTheDocument();
  });
  it('체온이 뜬다', () => {
    const txtTemperature = screen.getByText('체온');
    expect(txtTemperature).toBeInTheDocument();
  });
  it('수면 시간이 뜬다', () => {
    const txtSleepTime = screen.getByText('수면');
    expect(txtSleepTime).toBeInTheDocument();
  });
  it('혈당이 뜬다', () => {
    const txtBloodSugar = screen.getByText('혈당');
    expect(txtBloodSugar).toBeInTheDocument();
  });
  it('혈압이 뜬다', () => {
    const txtBloodPressure = screen.getByText('혈압');
    expect(txtBloodPressure).toBeInTheDocument();
  });
  it('체중이 뜬다', () => {
    const txtWeight = screen.getByText('체중');
    expect(txtWeight).toBeInTheDocument();
  });
});
