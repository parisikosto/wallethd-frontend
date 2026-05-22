import { useQuery } from '@tanstack/react-query';

import { getTransactionsYearsApi } from '@/api';

import { transactionsQueryKey } from '../constants';

const TRANSACTIONS_YEARS_STALE_TIME_MS = 5 * 60 * 1000;

export const useTransactionsYears = (): {
  isErrorTransactionsYears: boolean;
  isFetchingTransactionsYears: boolean;
  transactionsYears: number[] | undefined;
} => {
  const {
    data: transactionsYearsData,
    isError: isErrorTransactionsYears,
    isFetching: isFetchingTransactionsYears,
  } = useQuery({
    queryFn: () => getTransactionsYearsApi(),
    queryKey: [transactionsQueryKey, 'useTransactionsYears'],
    staleTime: TRANSACTIONS_YEARS_STALE_TIME_MS,
  });

  return {
    isErrorTransactionsYears,
    isFetchingTransactionsYears,
    transactionsYears: transactionsYearsData?.data,
  };
};
