import { useQuery } from '@tanstack/react-query';

import { getTransactionsSummaryApi, type TransactionSummary } from '@/api';

export const useTransactionsSummary = (): {
  isFetchingTransactionsSummary: boolean;
  transactionsSummary: TransactionSummary | undefined;
} => {
  const {
    data: transactionsSummaryData,
    isFetching: isFetchingTransactionsSummary,
  } = useQuery({
    queryFn: () => getTransactionsSummaryApi(),
    queryKey: ['transactions', 'summary'],
  });

  return {
    isFetchingTransactionsSummary,
    transactionsSummary: transactionsSummaryData?.data,
  };
};
