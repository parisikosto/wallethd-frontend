import { useQuery } from '@tanstack/react-query';

import { getTransactionsSummaryApi, type TransactionSummary } from '@/api';

export const useTransactionsSummaryQueryKey = ['transactions', 'summary'];

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
    queryKey: useTransactionsSummaryQueryKey,
  });

  return {
    isErrorTransactionsSummary,
    isFetchingTransactionsSummary,
    transactionsSummary: transactionsSummaryData?.data,
  };
};
