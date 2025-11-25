import { Fragment, type JSX } from 'react';
import { Info } from 'lucide-react';

import type { Transaction } from '@/api';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui';
import { formatCurrency } from '@/utils';

interface IncomeSectionProps {
  incomes: Transaction[];
  totalIncome: number;
}

export const IncomeSection = ({
  incomes,
  totalIncome,
}: IncomeSectionProps): JSX.Element => {
  const completedIncomes = incomes.filter((t) => t.status === 'completed');
  const pendingIncomes = incomes.filter((t) => t.status === 'pending');

  return (
    <div
      data-section="income"
      className="bg-green-100 dark:bg-green-950/30 px-4 py-3"
    >
      <h3 className="text-base font-bold mb-3 text-foreground">Incomes</h3>
      {incomes.length > 0 ? (
        <div className="space-y-2">
          {completedIncomes.map((transaction, idx) => (
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
                          <p className="max-w-xs">{transaction.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-base text-foreground">
                    {formatCurrency(transaction.amountDecimal)}
                  </p>
                </div>
              </div>
              {idx !== completedIncomes.length - 1 && (
                <hr className="border-gray-400 dark:border-gray-600" />
              )}
            </Fragment>
          ))}

          {pendingIncomes.length > 0 && completedIncomes.length > 0 && (
            <hr className="border-gray-400 dark:border-gray-600" />
          )}

          {pendingIncomes.map((transaction, idx) => (
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
                          <p className="max-w-xs">{transaction.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-base text-foreground">
                    {formatCurrency(transaction.amountDecimal)}
                  </p>
                </div>
              </div>
              {idx !== pendingIncomes.length - 1 && (
                <hr className="border-gray-400 dark:border-gray-600" />
              )}
            </Fragment>
          ))}

          {pendingIncomes.length > 0 && (
            <div className="flex justify-end py-2">
              <span className="bg-white dark:bg-gray-800 text-red-600 px-3 py-1 text-xs uppercase w-[100px] text-center">
                PENDING
              </span>
            </div>
          )}

          {incomes.length > 1 && (
            <div className="flex justify-end pt-0 mt-0">
              <span className="text-base text-foreground">
                {formatCurrency(totalIncome)}
              </span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground italic">No income</p>
      )}
    </div>
  );
};
