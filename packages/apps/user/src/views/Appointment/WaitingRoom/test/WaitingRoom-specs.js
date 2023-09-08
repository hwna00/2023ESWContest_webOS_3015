import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WaitingRoom from '../WaitingRoom';

describe('대기실', () => {
  it('대기실이 잘 뜨는가', () => {
    const { getByText } = render(<WaitingRoom />);
    expect(getByText(/대기실/)).toBeInTheDocument();
  });

  it('예약 리스트가 잘 뜨는가', () => {
    const { getByText } = render(<WaitingRoom />);
    expect(getByText(/양지웅/)).toBeInTheDocument();
    expect(getByText(/김종석/)).toBeInTheDocument();
  });

  it('취소라기 버튼을 누르면 예약이 취소되는가', () => {
    window.confirm = jest.fn(() => true);

    const { getByText, getAllByText, queryByText } = render(<WaitingRoom />);

    expect(getByText(/양지웅/)).toBeInTheDocument();

    const cancelButtonList = getAllByText('취소하기');
    fireEvent.click(cancelButtonList[0]);
    expect(queryByText(/양지웅/)).toBeNull();
  });
});
