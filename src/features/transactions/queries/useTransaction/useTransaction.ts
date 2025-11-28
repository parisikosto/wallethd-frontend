import { useQuery } from '@tanstack/react-query';

import {
  type ApiGenericResponse,
  getTransactionApi,
  type Transaction,
} from '@/api';

import { transactionsQueryKey } from '../constants';

export const useTransaction = (
  id: string,
): {
  isErrorTransaction: boolean;
  isFetchingTransaction: boolean;
  transaction: Transaction | undefined;
} => {
  const {
    data: transactionData,
    isError: isErrorTransaction,
    isFetching: isFetchingTransaction,
  } = useQuery<ApiGenericResponse<Transaction>>({
    queryFn: () => getTransactionApi(id),
    queryKey: [transactionsQueryKey, 'useTransaction', id],
    enabled: !!id,
  });

  return {
    isErrorTransaction,
    isFetchingTransaction,
    transaction: transactionData?.data,
  };
};
