import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTransactionApi, type CreateTransactionDto } from '@/api';
import { AppRouterPath } from '@/router';

import { transactionsQueryKey } from '../constants';

export type CreateTransactionOptions = {
  onSuccess?: () => void;
  skipNavigation?: boolean;
};

export const useCreateTransaction = (): {
  createTransaction: (
    payload: CreateTransactionDto,
    options?: CreateTransactionOptions,
  ) => void;
  isPendingCreateTransaction: boolean;
} => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isPendingCreateTransaction, mutate } = useMutation({
    mutationFn: createTransactionApi,
    onError: (err) => {
      if (err instanceof Error) {
        toast.error('Failed to create transaction');
      }
    },
  });

  const createTransaction = (
    payload: CreateTransactionDto,
    options?: CreateTransactionOptions,
  ): void => {
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [transactionsQueryKey] });
        toast.success('Transaction created successfully');

        if (!options?.skipNavigation) {
          navigate(AppRouterPath.Transactions, { replace: true });
        }

        options?.onSuccess?.();
      },
    });
  };

  return { createTransaction, isPendingCreateTransaction };
};
