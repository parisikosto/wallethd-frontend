import type { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { HomePage, LoginPage, SettingsPage, TransactionsPage } from './pages';

export const App = (): JSX.Element => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
