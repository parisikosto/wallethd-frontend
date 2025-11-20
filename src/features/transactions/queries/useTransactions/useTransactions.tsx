import { useQuery } from '@tanstack/react-query';

import { getTransactionsApi, type Transaction } from '@/api';

export const useTransactions = (): {
  isFetchingTransactions: boolean;
  transactions: Transaction[] | undefined;
} => {
  const { data: transactionsData, isFetching: isFetchingTransactions } =
    useQuery({
      queryFn: () => getTransactionsApi(),
      queryKey: ['transactions'],
    });

  return {
    isFetchingTransactions,
    transactions: transactionsData?.data,
  };
};
