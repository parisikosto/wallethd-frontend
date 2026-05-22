import type { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LoginLayout, MainLayout } from '@/layouts';

import {
  CreateTransactionPage,
  DashboardPage,
  DuplicateTransactionPage,
  EditTransactionPage,
  LoginPage,
  NotFoundPage,
  SettingsPage,
  SignupPage,
  TransactionsPage,
  YearSummaryPage,
} from '../../pages';
import { AppRouterPath } from '../constants';
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
          <Route index element={<DashboardPage />} />
          <Route
            path={AppRouterPath.YearSummary}
            element={<YearSummaryPage />}
          />
          <Route
            path={AppRouterPath.Transactions}
            element={<TransactionsPage />}
          />
          <Route
            path={AppRouterPath.TransactionsNew}
            element={<CreateTransactionPage />}
          />
          <Route
            path={AppRouterPath.TransactionsEdit}
            element={<EditTransactionPage />}
          />
          <Route
            path={AppRouterPath.TransactionsDuplicate}
            element={<DuplicateTransactionPage />}
          />
          <Route path={AppRouterPath.Settings} element={<SettingsPage />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path={AppRouterPath.Login} element={<LoginPage />} />
          <Route path={AppRouterPath.Signup} element={<SignupPage />} />
        </Route>
        <Route path={AppRouterPath.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
