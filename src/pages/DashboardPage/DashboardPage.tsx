import type { JSX } from 'react';

import { SectionCards } from '@/components';
import { MonthlyTransactions } from '@/features';

export const DashboardPage = (): JSX.Element => {
  return (
    <>
      <SectionCards />
      <MonthlyTransactions />
    </>
  );
};
