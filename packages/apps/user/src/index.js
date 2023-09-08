import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';
import router from './router';
import theme from '../theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
  root.render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ChakraProvider>
    </React.StrictMode>,
  );
}
