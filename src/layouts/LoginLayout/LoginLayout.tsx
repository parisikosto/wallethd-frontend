import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useUserProfile } from '@/features';
import { Spinner } from '@/ui';

export const LoginLayout = (): JSX.Element => {
  const { isAuthenticated, isPendingUserProfile } = useUserProfile();

  if (isPendingUserProfile) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
