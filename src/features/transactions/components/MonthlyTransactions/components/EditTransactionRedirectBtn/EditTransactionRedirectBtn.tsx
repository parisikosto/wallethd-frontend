import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Transaction } from '@/api';
import { AppRouterPath } from '@/router';

export const EditTransactionRedirectBtn = ({
  transaction,
}: {
  transaction: Transaction;
}): JSX.Element => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() =>
        navigate(`/transactions/${transaction._id}/edit`, {
          state: { from: AppRouterPath.Home },
        })
      }
      className="text-base font-normal text-foreground truncate hover:underline cursor-pointer text-left"
    >
      {transaction.note}
    </button>
  );
};
