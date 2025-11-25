import { type JSX } from 'react';

import { formatCurrency } from '@/utils';

interface BudgetSectionProps {
  budgetForNecessities: number;
  expectedSavings: number;
  wantsBudget: number;
}

export const BudgetSection = ({
  budgetForNecessities,
  expectedSavings,
  wantsBudget,
}: BudgetSectionProps): JSX.Element => {
  return (
    <div className="bg-blue-200 dark:bg-blue-950/30 space-y-1 px-3 py-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">
          Budget 50% for necessities
        </span>
        <span className="font-medium">
          {formatCurrency(budgetForNecessities)}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Budget 30% for wants</span>
        <span className="font-medium">{formatCurrency(wantsBudget)}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Budget 20% for savings</span>
        <span className="font-medium">{formatCurrency(expectedSavings)}</span>
      </div>
    </div>
  );
};
