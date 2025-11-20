import type { JSX } from 'react';

import { SpinnerCustom } from '@/components';

import { useTransactions } from '../../queries';

import { DataTable } from './components';

export const TransactionsDataTable = ({
  showFilters = false,
}: {
  showFilters?: boolean;
}): JSX.Element => {
  const { isFetchingTransactions, transactions } = useTransactions();

  if (isFetchingTransactions) {
    return <SpinnerCustom />;
  }

  if (!transactions) {
    return <div>No transactions found</div>;
  }

  const data = transactions.map(
    ({ _id: id, amount, date, dueDate, facility, note, status, type }) => ({
      id,
      amount,
      date,
      dueDate: dueDate || '-',
      facility: facility || '-',
      note,
      status: `${status}`,
      type,
    }),
  );

  return <DataTable data={data} showFilters={showFilters} />;
};
