import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  type ApiGenericResponse,
  type Transaction,
  updateTransactionApi,
  type UpdateTransactionDto,
} from '@/api';

import { transactionsQueryKey } from '../constants';

interface MutationFnArgs {
  data: UpdateTransactionDto;
  id: string;
}

export const useUpdateTransaction = (
  returnPath?: string,
): {
  isPendingUpdateTransaction: boolean;
  updateTransaction: UseMutateFunction<
    ApiGenericResponse<Transaction>,
    Error,
    MutationFnArgs
  >;
} => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isPendingUpdateTransaction, mutate: updateTransaction } =
    useMutation({
      mutationFn: ({ data, id }: MutationFnArgs) =>
        updateTransactionApi(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [transactionsQueryKey] });
        toast.success('Transaction updated successfully');

        if (returnPath) {
          navigate(returnPath, { replace: true });
        } else {
          navigate(-1);
        }
      },
      onError: (err) => {
        if (err instanceof Error) {
          toast.error('Failed to update transaction');
        }
      },
    });

  return { isPendingUpdateTransaction, updateTransaction };
};
