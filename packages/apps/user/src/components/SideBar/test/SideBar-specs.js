import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import SideBar from '../SideBar';

describe('Test SideBar Component', () => {
  it('', async () => {
    render(<SideBar />, { wrapper: BrowserRouter });
  });
});
