import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../theme';

import { store } from './store';
import router from './routes/index';
import { AnimatePresence } from 'framer-motion';

const root = ReactDOM.createRoot(document.getElementById('root'));

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
  root.render(
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <AnimatePresence>
            <RouterProvider router={router} />
          </AnimatePresence>
        </Provider>
      </ChakraProvider>
    </React.StrictMode>,
  );
}
