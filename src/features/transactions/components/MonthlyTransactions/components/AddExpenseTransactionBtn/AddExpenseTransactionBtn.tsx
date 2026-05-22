import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { MONTHS } from '@/constants';
import { AppRouterPath } from '@/router';
import { Button } from '@/ui';

interface AddExpenseTransactionBtnProps {
  monthIndex: number;
  year: number;
}

export const AddExpenseTransactionBtn = ({
  monthIndex,
  year,
}: AddExpenseTransactionBtnProps): JSX.Element => {
  const monthLabel = MONTHS[monthIndex];

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 shrink-0 border border-orange-600 bg-transparent text-orange-800 shadow-none hover:bg-orange-200/50 hover:text-orange-900 dark:border-orange-500 dark:text-orange-200 dark:hover:bg-orange-950/40 dark:hover:text-orange-100"
      asChild
    >
      <Link
        to={AppRouterPath.TransactionsNewExpenseForMonth(year, monthIndex)}
        aria-label={`Add expense for ${monthLabel} ${year}`}
      >
        <Plus className="size-4" />
      </Link>
    </Button>
  );
};
