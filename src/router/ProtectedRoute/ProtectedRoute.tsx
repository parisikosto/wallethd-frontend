import type { JSX, ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpinnerCustom } from '@/components';

import { useUserProfile } from '../../features';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps): JSX.Element | undefined => {
  const navigate = useNavigate();

  const { isAuthenticated, isPendingUserProfile } = useUserProfile();

  useEffect(() => {
    if (!isAuthenticated && !isPendingUserProfile) {
      navigate('/login');
    }
  }, [isAuthenticated, isPendingUserProfile, navigate]);

  if (isPendingUserProfile) {
    return <SpinnerCustom />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }
};
