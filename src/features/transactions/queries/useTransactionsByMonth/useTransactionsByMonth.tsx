import { useQuery } from '@tanstack/react-query';

import { getTransactionsByMonthApi, type TransactionsMonthlyData } from '@/api';

import { transactionsQueryKey } from '../constants';

export const useTransactionsByMonth = (
  year?: number,
): {
  isErrorTransactionsByMonth: boolean;
  isFetchingTransactionsByMonth: boolean;
  isPendingTransactionsByMonth: boolean;
  transactionsByMonth: TransactionsMonthlyData[] | undefined;
} => {
  const {
    data: transactionsByMonthData,
    isError: isErrorTransactionsByMonth,
    isFetching: isFetchingTransactionsByMonth,
    isPending: isPendingTransactionsByMonth,
  } = useQuery({
    queryFn: () => getTransactionsByMonthApi(year),
    queryKey: [transactionsQueryKey, 'useTransactionsByMonth', year],
  });

  return {
    isErrorTransactionsByMonth,
    isFetchingTransactionsByMonth,
    isPendingTransactionsByMonth,
    transactionsByMonth: transactionsByMonthData?.data,
  };
};
