import type { JSX } from 'react';

import { useTransactionsSummary } from '@/features';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/ui';
import { formatCurrency } from '@/utils';

export const SectionCards = (): JSX.Element => {
  const {
    isErrorTransactionsSummary,
    isFetchingTransactionsSummary,
    transactionsSummary,
  } = useTransactionsSummary();

  if (isFetchingTransactionsSummary) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
        <Card className="@container/card py-3 gap-3 border-l-4 border-l-emerald-500 dark:border-l-emerald-400">
          <CardHeader className="px-4 pb-1.5 gap-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="px-4 pt-1 pb-0">
            <div className="space-y-1">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-32" />
            </div>
          </CardContent>
        </Card>
        <Card className="@container/card py-3 gap-3 border-l-4 border-l-rose-500 dark:border-l-rose-400">
          <CardHeader className="px-4 pb-1.5 gap-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="px-4 pt-1 pb-0">
            <div className="space-y-1">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isErrorTransactionsSummary || !transactionsSummary) {
    return (
      <div className="px-4 lg:px-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
            <CardDescription>
              Failed to load transactions summary. Please try again later.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const {
    completedExpenses = 0,
    completedIncome = 0,
    pendingExpenses = 0,
    pendingIncome = 0,
    totalExpenses = 0,
    totalIncome = 0,
  } = transactionsSummary;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card py-3 gap-3 border-l-4 border-l-emerald-500 dark:border-l-emerald-400">
        <CardHeader className="px-4 pb-1.5 gap-1">
          <CardDescription className="text-xs">Total Income</CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {formatCurrency(totalIncome)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-0.5 px-4 pt-1 pb-0 text-xs">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Completed Income: {formatCurrency(completedIncome)}
          </div>
          <div className="text-muted-foreground">
            Pending Income: {formatCurrency(pendingIncome)}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card py-3 gap-3 border-l-4 border-l-rose-500 dark:border-l-rose-400">
        <CardHeader className="px-4 pb-1.5 gap-1">
          <CardDescription className="text-xs">Total Expenses</CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {formatCurrency(totalExpenses)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-0.5 px-4 pt-1 pb-0 text-xs">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Completed Expenses: {formatCurrency(completedExpenses)}
          </div>
          <div className="text-muted-foreground">
            Pending Expenses: {formatCurrency(pendingExpenses)}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
