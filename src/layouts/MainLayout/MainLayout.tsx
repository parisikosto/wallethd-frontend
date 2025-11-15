import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = (): JSX.Element => {
  return <Outlet />;
};
