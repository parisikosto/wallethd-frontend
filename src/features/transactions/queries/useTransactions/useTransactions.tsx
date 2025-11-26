import { useQuery } from '@tanstack/react-query';

import { getTransactionsApi, type Transaction } from '@/api';

export const useTransactionsQueryKey = ['transactions'];

export const useTransactions = (): {
  isErrorTransactions: boolean;
  isFetchingTransactions: boolean;
  transactions: Transaction[] | undefined;
} => {
  const {
    data: transactionsData,
    isError: isErrorTransactions,
    isFetching: isFetchingTransactions,
  } = useQuery({
    queryFn: () => getTransactionsApi(),
    queryKey: useTransactionsQueryKey,
  });

  return {
    isErrorTransactions,
    isFetchingTransactions,
    transactions: transactionsData?.data,
  };
};
