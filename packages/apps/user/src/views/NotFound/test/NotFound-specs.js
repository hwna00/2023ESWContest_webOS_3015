import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';
import '@testing-library/jest-dom/extend-expect';

describe('NotFound', () => {
  test('renders "Not Found"', () => {
    render(<NotFound />);

    const message = screen.getByText(/404 not found/i);
    expect(message).toBeInTheDocument();
  });
  test('이전 버튼', () => {
    render(<NotFound />);

    const previousButton = screen.getByRole('button', {
      name: /이전 페이지로/i,
    });
    expect(previousButton).toBeInTheDocument();
  });
  test('메인 버튼', () => {
    render(<NotFound />);

    const mainButton = screen.getByRole('button', {
      name: /메인 페이지로/i,
    });
    expect(mainButton).toBeInTheDocument();
  });
});
