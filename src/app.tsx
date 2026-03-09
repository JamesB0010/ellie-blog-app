import React from 'react';
import { createRoot } from 'react-dom/client';
import MainPage from './pages/MainPage';

const root = createRoot(document.body);
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);