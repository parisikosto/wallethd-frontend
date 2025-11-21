import type { JSX } from 'react';

import { useTransactionsSummary } from '@/features';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui';

export const SectionCards = (): JSX.Element => {
  const { transactionsSummary } = useTransactionsSummary();

  const {
    completedExpenses = '-',
    completedIncome = '-',
    pendingExpenses = '-',
    pendingIncome = '-',
    totalExpenses = '-',
    totalIncome = '-',
  } = transactionsSummary || {};

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Income</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalIncome}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Completed Income: {completedIncome}
          </div>
          <div className="text-muted-foreground">
            Pending Income: {pendingIncome}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalExpenses}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Completed Expenses: {completedExpenses}
          </div>
          <div className="text-muted-foreground">
            Pending Expenses: {pendingExpenses}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
