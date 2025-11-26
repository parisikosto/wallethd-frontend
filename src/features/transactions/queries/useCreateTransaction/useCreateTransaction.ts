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

import { useTransactionsQueryKey } from '../useTransactions';
import { useTransactionsByMonthQueryKey } from '../useTransactionsByMonth';
import { useTransactionsSummaryQueryKey } from '../useTransactionsSummary';

export const useCreateTransaction = (): {
  createTransaction: UseMutateFunction<
    ApiGenericResponse<Transaction>,
    Error,
    CreateTransactionDto
  >;
  isPendingCreate: boolean;
} => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isPendingCreate, mutate: createTransaction } = useMutation(
    {
      mutationFn: createTransactionApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: useTransactionsQueryKey });
        queryClient.invalidateQueries({
          queryKey: useTransactionsByMonthQueryKey,
        });
        queryClient.invalidateQueries({
          queryKey: useTransactionsSummaryQueryKey,
        });

        toast.success('Transaction created successfully');
        navigate('/transactions', { replace: true });
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast.error('Failed to create transaction');
        }
      },
    },
  );

  return { createTransaction, isPendingCreate };
};
