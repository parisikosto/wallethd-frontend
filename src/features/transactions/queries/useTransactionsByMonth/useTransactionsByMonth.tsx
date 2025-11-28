import { useQuery } from '@tanstack/react-query';

import { getTransactionsByMonthApi, type TransactionsMonthlyData } from '@/api';

import { transactionsQueryKey } from '../constants';

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
    queryKey: [transactionsQueryKey, 'useTransactionsByMonth'],
  });

  return {
    isErrorTransactionsByMonth,
    isFetchingTransactionsByMonth,
    transactionsByMonth: transactionsByMonthData?.data,
  };
};
