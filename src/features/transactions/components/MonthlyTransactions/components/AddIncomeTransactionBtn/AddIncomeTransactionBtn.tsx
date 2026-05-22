import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import { MONTHS } from '@/constants';
import { AppRouterPath } from '@/router';
import { Button } from '@/ui';

interface AddIncomeTransactionBtnProps {
  monthIndex: number;
  year: number;
}

export const AddIncomeTransactionBtn = ({
  monthIndex,
  year,
}: AddIncomeTransactionBtnProps): JSX.Element => {
  const monthLabel = MONTHS[monthIndex];

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 shrink-0 border border-green-600 bg-transparent text-green-800 shadow-none hover:bg-green-200/50 hover:text-green-900 dark:border-green-500 dark:text-green-200 dark:hover:bg-green-950/40 dark:hover:text-green-100"
      asChild
    >
      <Link
        to={AppRouterPath.TransactionsNewIncomeForMonth(year, monthIndex)}
        aria-label={`Add income for ${monthLabel} ${year}`}
      >
        <Plus className="size-4" />
      </Link>
    </Button>
  );
};
