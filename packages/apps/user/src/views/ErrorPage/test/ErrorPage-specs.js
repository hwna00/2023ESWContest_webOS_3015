import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import ErrorPage from '../ErrorPage';

describe('Error Page', () => {
  test('Error Page', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );

    const msg = screen.getByText(/500 Server Error/i);
    expect(msg).toBeInTheDocument();
  });
  test('이전 버튼', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );

    const previousBtn = screen.getByRole('button', {
      name: /이전 페이지로/i,
    });
    expect(previousBtn).toBeInTheDocument();
  });
  test('메인 버튼', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );

    const mainBtn = screen.getByRole('button', {
      name: /메인 페이지로/i,
    });
    expect(mainBtn).toBeInTheDocument();
  });
});
