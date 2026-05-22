import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCopy, IconTrash } from '@tabler/icons-react';

import type { Transaction } from '@/api';
import { useDeleteTransaction } from '@/features';
import { AppRouterPath } from '@/router';
import { Button } from '@/ui';

interface EditTransactionActionsProps {
  disabled?: boolean;
  transaction: Transaction;
}

export const EditTransactionActions = ({
  disabled = false,
  transaction,
}: EditTransactionActionsProps): JSX.Element => {
  const navigate = useNavigate();
  const { deleteTransaction, isPendingDeleteTransaction } =
    useDeleteTransaction({ navigateBack: true });

  const isDisabled = disabled || isPendingDeleteTransaction;

  return (
    <div className="flex flex-wrap gap-2 md:shrink-0">
      <Button
        type="button"
        variant="outline"
        disabled={isDisabled}
        onClick={() =>
          navigate(`/transactions/${transaction._id}/duplicate`, {
            state: { from: AppRouterPath.Transactions },
          })
        }
      >
        <IconCopy />
        Duplicate
      </Button>
      <Button
        type="button"
        variant="destructive"
        disabled={isDisabled}
        onClick={() => deleteTransaction(transaction._id)}
      >
        <IconTrash />
        Delete
      </Button>
    </div>
  );
};
