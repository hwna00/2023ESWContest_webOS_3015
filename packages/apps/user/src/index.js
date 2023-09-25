import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from '../theme';
import { store } from './store';
import router from './routes/index';
import { AnimatePresence } from 'framer-motion';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
          <Provider store={store}>
            <AnimatePresence>
              <RouterProvider router={router} />
            </AnimatePresence>
          </Provider>
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
