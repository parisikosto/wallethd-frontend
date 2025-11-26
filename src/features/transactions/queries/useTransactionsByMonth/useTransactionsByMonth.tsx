import { useQuery } from '@tanstack/react-query';

import { getTransactionsByMonthApi, type TransactionsMonthlyData } from '@/api';

export const useTransactionsByMonthQueryKey = ['transactions', 'by-month'];

export const useTransactionsByMonth = (
  year?: number,
): {
  isErrorTransactionsByMonth: boolean;
  isFetchingTransactionsByMonth: boolean;
  transactionsByMonth: TransactionsMonthlyData[] | undefined;
} => {
  const {
    data: transactionsByMonthData,
    isError: isErrorTransactionsByMonth,
    isFetching: isFetchingTransactionsByMonth,
  } = useQuery({
    queryFn: () => getTransactionsByMonthApi(year),
    queryKey: useTransactionsByMonthQueryKey,
  });

  return {
    isErrorTransactionsByMonth,
    isFetchingTransactionsByMonth,
    transactionsByMonth: transactionsByMonthData?.data,
  };
};
