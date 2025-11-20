import type { JSX } from 'react';

import { TransactionsDataTable } from '@/features';

export const TransactionsPage = (): JSX.Element => {
  return (
    <>
      <TransactionsDataTable showFilters />
    </>
  );
};
