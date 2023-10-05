import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../../../common/theme';

import router from './router';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
  root.render(
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </ChakraProvider>
    </QueryClientProvider>,
  );
}
