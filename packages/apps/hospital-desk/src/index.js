import React from 'react';

import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import theme from '@housepital/common/theme/index';
import { ChakraProvider } from '@chakra-ui/react';

import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
