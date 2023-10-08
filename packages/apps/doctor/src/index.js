import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from '@housepital/common/theme';
import { ChakraProvider } from '@chakra-ui/react';

import { store } from './store';
import router from './router';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

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
