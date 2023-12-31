import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../../../common/theme';

import { store } from './store';
import router from './routes/index';

const client = new QueryClient();

const root = createRoot(document.getElementById('root'));

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
  root.render(
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <AnimatePresence>
            <RouterProvider router={router} />
          </AnimatePresence>
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>,
  );
}
