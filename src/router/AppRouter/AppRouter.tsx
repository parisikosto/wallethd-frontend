import type { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginLayout, MainLayout } from '@/layouts';

import {
  HomePage,
  LoginPage,
  NotFoundPage,
  SettingsPage,
  SignupPage,
  TransactionsPage,
} from '../../pages';
import { ProtectedRoute } from '../ProtectedRoute';

export const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
