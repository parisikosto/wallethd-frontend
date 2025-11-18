import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SpinnerCustom } from '@/components';
import { useUserProfile } from '@/features';

export const LoginLayout = (): JSX.Element => {
  const { isAuthenticated, isPendingUserProfile } = useUserProfile();

  if (isPendingUserProfile) {
    return <SpinnerCustom />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
