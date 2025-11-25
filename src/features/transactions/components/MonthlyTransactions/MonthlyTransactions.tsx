import { type JSX } from 'react';

import { MONTHS } from '@/constants';
import { useTransactionsByMonth } from '@/features';
import { Card, CardContent, CardTitle } from '@/ui';

import {
  BudgetSection,
  ExpensesSection,
  IncomeSection,
  LoadingSkeleton,
  SavingsSection,
  WantsSection,
} from './components';
import { useEqualizeSectionHeights } from './hooks';

export const MonthlyTransactions = (): JSX.Element => {
  const { isFetchingTransactionsByMonth, transactionsByMonth } =
    useTransactionsByMonth();

  const containerRef = useEqualizeSectionHeights(transactionsByMonth);

  if (isFetchingTransactionsByMonth) {
    return <LoadingSkeleton />;
  }

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const nextMonth = (currentMonth + 1) % 12;

  return (
    <div className="px-4 lg:px-6 mt-0">
      <h2 className="text-2xl font-bold mb-6">Monthly Overview</h2>
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {transactionsByMonth?.map(
          (
            {
              actualSavings,
              budgetForNecessities,
              expectedSavings,
              expenses,
              incomes,
              isOnTrack,
              isOverBudget,
              totalExpenses,
              totalIncome,
              wantsBudget,
            },
            monthIndex,
          ) => {
            const isCurrentMonth = monthIndex === currentMonth;
            const isNextMonth = monthIndex === nextMonth;

            let monthBgColor = 'bg-blue-200 dark:bg-blue-950/30';
            if (isCurrentMonth) {
              monthBgColor = 'bg-green-200 dark:bg-green-950/30';
            } else if (isNextMonth) {
              monthBgColor = 'bg-orange-200 dark:bg-orange-950/30';
            }

            return (
              <Card
                key={monthIndex}
                data-card
                className="flex flex-col pt-0 pb-0 shadow-none rounded-none"
              >
                <CardContent className="flex-1 space-y-0 p-0">
                  <div className={`${monthBgColor} text-center py-3`}>
                    <CardTitle className="text-lg">
                      {MONTHS[monthIndex]} {currentYear}
                    </CardTitle>
                  </div>
                  <hr className="whitespace-nowrap" />
                  <BudgetSection
                    budgetForNecessities={budgetForNecessities}
                    expectedSavings={expectedSavings}
                    wantsBudget={wantsBudget}
                  />
                  <IncomeSection incomes={incomes} totalIncome={totalIncome} />
                  <ExpensesSection
                    budgetForNecessities={budgetForNecessities}
                    expenses={expenses}
                    isOverBudget={isOverBudget}
                    totalExpenses={totalExpenses}
                  />
                  <WantsSection
                    currentYear={currentYear}
                    monthIndex={monthIndex}
                    wantsBudget={wantsBudget}
                  />
                  <SavingsSection
                    actualSavings={actualSavings}
                    expectedSavings={expectedSavings}
                    isOnTrack={isOnTrack}
                  />
                </CardContent>
              </Card>
            );
          },
        )}
      </div>
    </div>
  );
};
