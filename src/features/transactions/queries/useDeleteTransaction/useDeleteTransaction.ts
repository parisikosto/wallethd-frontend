import toast from 'react-hot-toast';
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  type ApiGenericResponse,
  deleteTransactionApi,
  type Transaction,
} from '@/api';

import { transactionsQueryKey } from '../constants';

export const useDeleteTransaction = (): {
  deleteTransaction: UseMutateFunction<
    ApiGenericResponse<Transaction>,
    Error,
    string
  >;
  isPendingDeleteTransaction: boolean;
} => {
  const queryClient = useQueryClient();

  const { isPending: isPendingDeleteTransaction, mutate: deleteTransaction } =
    useMutation({
      mutationFn: deleteTransactionApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [transactionsQueryKey] });
        toast.success('Transaction deleted successfully');
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast.error('Failed to delete transaction');
        }
      },
    });

  return { deleteTransaction, isPendingDeleteTransaction };
};
