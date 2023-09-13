import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectPharm from '../SelectPharmacy';

jest.mock('../PharmList.js', () => ({
  PharmList: [
    { name: '조아약국', rate: '4.8', distance: '1km' },
    { name: '튼튼약국', rate: '4.5', distance: '1.5km' },
  ],
}));

describe('진료 후 약국 선택 페이지', () => {
  it('약국 리스트가 잘 뜨는가', () => {
    const { getByText } = render(<SelectPharm />, { wrapper: BrowserRouter });
    expect(getByText('조아약국')).toBeInTheDocument();
    expect(getByText('튼튼약국')).toBeInTheDocument();
  });

  it('약국을 누르면 모달창이 뜨는가', () => {
    const { getByText, queryByText } = render(<SelectPharm />, {
      wrapper: BrowserRouter,
    });

    expect(queryByText(/배달수령/)).not.toBeInTheDocument();

    fireEvent.click(getByText('조아약국'));

    expect(queryByText(/배달수령/)).toBeInTheDocument();
  });
});
