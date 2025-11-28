import { useQuery } from '@tanstack/react-query';

import { getTransactionsSummaryApi, type TransactionSummary } from '@/api';

import { transactionsQueryKey } from '../constants';

export const useTransactionsSummary = (): {
  isErrorTransactionsSummary: boolean;
  isFetchingTransactionsSummary: boolean;
  transactionsSummary: TransactionSummary | undefined;
} => {
  const {
    data: transactionsSummaryData,
    isError: isErrorTransactionsSummary,
    isFetching: isFetchingTransactionsSummary,
  } = useQuery({
    queryFn: () => getTransactionsSummaryApi(),
    queryKey: [transactionsQueryKey, 'useTransactionsSummary'],
  });

  return {
    isErrorTransactionsSummary,
    isFetchingTransactionsSummary,
    transactionsSummary: transactionsSummaryData?.data,
  };
};
