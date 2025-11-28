import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  type ApiGenericResponse,
  createTransactionApi,
  type CreateTransactionDto,
  type Transaction,
} from '@/api';
import { AppRouterPath } from '@/router';

import { transactionsQueryKey } from '../constants';

export const useCreateTransaction = (): {
  createTransaction: UseMutateFunction<
    ApiGenericResponse<Transaction>,
    Error,
    CreateTransactionDto
  >;
  isPendingCreateTransaction: boolean;
} => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isPendingCreateTransaction, mutate: createTransaction } =
    useMutation({
      mutationFn: createTransactionApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [transactionsQueryKey] });
        toast.success('Transaction created successfully');

        navigate(AppRouterPath.Transactions, { replace: true });
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast.error('Failed to create transaction');
        }
      },
    });

  return { createTransaction, isPendingCreateTransaction };
};
