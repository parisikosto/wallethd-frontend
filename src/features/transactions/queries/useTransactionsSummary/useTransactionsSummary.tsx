import { useQuery } from '@tanstack/react-query';

import { getTransactionsSummaryApi, type TransactionSummary } from '@/api';

import { transactionsQueryKey } from '../constants';

export const useTransactionsSummary = (
  year?: number,
): {
  isErrorTransactionsSummary: boolean;
  isFetchingTransactionsSummary: boolean;
  transactionsSummary: TransactionSummary | undefined;
} => {
  const {
    data: transactionsSummaryData,
    isError: isErrorTransactionsSummary,
    isFetching: isFetchingTransactionsSummary,
  } = useQuery({
    queryFn: () => getTransactionsSummaryApi(year),
    queryKey: [transactionsQueryKey, 'useTransactionsSummary', year],
  });

  return {
    isErrorTransactionsSummary,
    isFetchingTransactionsSummary,
    transactionsSummary: transactionsSummaryData?.data,
  };
};
