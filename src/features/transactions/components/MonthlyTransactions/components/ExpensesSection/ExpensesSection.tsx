import { Fragment, type JSX } from 'react';
import { Info } from 'lucide-react';

import type { Transaction } from '@/api';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { formatCurrency, formatDate } from '@/utils';

interface ExpensesSectionProps {
  budgetForNecessities: number;
  expenses: Transaction[];
  isOverBudget: boolean;
  totalExpenses: number;
}

export const ExpensesSection = ({
  budgetForNecessities,
  expenses,
  isOverBudget,
  totalExpenses,
}: ExpensesSectionProps): JSX.Element => {
  const completedExpenses = expenses.filter((t) => t.status === 'completed');
  const pendingExpenses = expenses.filter((t) => t.status === 'pending');

  return (
    <div
      data-section="expenses"
      className="bg-orange-200 dark:bg-orange-950/30 px-4 pt-3 pb-5 flex flex-col"
    >
      <h3 className="text-base font-bold mb-3 text-foreground">Expenses</h3>
      {expenses.length > 0 ? (
        <>
          <div className="flex-1 space-y-2">
            {completedExpenses.map((transaction, idx) => (
              <Fragment key={transaction._id}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-base font-normal text-foreground truncate">
                        {transaction.note}
                      </p>
                      {transaction.description && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="size-3 text-muted-foreground flex-shrink-0 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              {transaction.description}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground uppercase">
                      {transaction.category?.parent?.name
                        ? `${transaction.category.parent.name} / ${transaction.category.name}`
                        : transaction.category?.name}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-base text-foreground">
                      {formatCurrency(transaction.amountDecimal)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                {idx !== completedExpenses.length - 1 && (
                  <hr className="border-gray-400 dark:border-gray-600" />
                )}
              </Fragment>
            ))}

            {completedExpenses.length > 0 && (
              <div className="flex justify-end py-2">
                <span className="bg-white dark:bg-gray-800 text-green-600 px-3 py-1 text-xs uppercase w-[100px] text-center">
                  COMPLETED
                </span>
              </div>
            )}

            {pendingExpenses.length > 0 && completedExpenses.length > 0 && (
              <hr className="border-gray-400 dark:border-gray-600" />
            )}

            {pendingExpenses.map((transaction, idx) => (
              <Fragment key={transaction._id}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-base font-normal text-foreground truncate">
                        {transaction.note}
                      </p>
                      {transaction.description && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="size-3 text-muted-foreground flex-shrink-0 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">
                              {transaction.description}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground uppercase">
                      {transaction.category?.parent?.name
                        ? `${transaction.category.parent.name} / ${transaction.category.name}`
                        : transaction.category?.name}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-base text-foreground">
                      {formatCurrency(transaction.amountDecimal)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                {idx !== pendingExpenses.length - 1 && (
                  <hr className="border-gray-400 dark:border-gray-600" />
                )}
              </Fragment>
            ))}

            {pendingExpenses.length > 0 && (
              <div className="flex justify-end py-2">
                <span className="bg-white dark:bg-gray-800 text-red-600 px-3 py-1 text-xs uppercase w-[100px] text-center">
                  PENDING
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center pt-2 mt-2">
            <span className="text-sm text-muted-foreground">
              [{formatCurrency(budgetForNecessities)}]
            </span>
            <span
              className={`${
                isOverBudget ? 'bg-red-600' : 'bg-green-600'
              } text-white px-3 py-1 rounded text-sm font-bold`}
            >
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </>
      ) : (
        <p className="text-xs text-muted-foreground italic">No expenses</p>
      )}
    </div>
  );
};
