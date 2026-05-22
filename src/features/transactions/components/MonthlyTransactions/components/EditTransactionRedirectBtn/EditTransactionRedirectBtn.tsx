import type { JSX } from 'react';
import { Link } from 'react-router-dom';

import type { Transaction } from '@/api';
import { AppRouterPath } from '@/router';

export const EditTransactionRedirectBtn = ({
  transaction,
}: {
  transaction: Transaction;
}): JSX.Element => {
  return (
    <Link
      to={AppRouterPath.TransactionsEditFor(transaction._id)}
      state={{ from: AppRouterPath.Home }}
      className="text-base font-normal text-foreground truncate hover:underline cursor-pointer text-left"
    >
      {transaction.note}
    </Link>
  );
};
