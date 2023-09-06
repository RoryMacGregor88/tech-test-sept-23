import React from 'react';

import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>,
);
