import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconDotsVertical } from '@tabler/icons-react';

import { useDeleteTransaction } from '@/features/transactions/queries';
import { AppRouterPath } from '@/router';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui';

export const ActionsCell = ({
  transactionId,
}: {
  transactionId: string;
}): JSX.Element => {
  const navigate = useNavigate();
  const { deleteTransaction, isPendingDeleteTransaction } =
    useDeleteTransaction();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem
          onClick={() =>
            navigate(`/transactions/${transactionId}/edit`, {
              state: { from: AppRouterPath.Transactions },
            })
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          disabled={isPendingDeleteTransaction}
          onClick={() => deleteTransaction(transactionId)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
