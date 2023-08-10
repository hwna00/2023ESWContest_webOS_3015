import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound', () => {
  test('Not Found', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const msg = screen.getByText(/404 not found/i);
    expect(msg).toBeInTheDocument();
  });
  test('이전 버튼', () => {
    render(
      <BrowserRouter>
        <NotFound />
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
        <NotFound />
      </BrowserRouter>,
    );

    const mainBtn = screen.getByRole('button', {
      name: /메인 페이지로/i,
    });
    expect(mainBtn).toBeInTheDocument();
  });
});
