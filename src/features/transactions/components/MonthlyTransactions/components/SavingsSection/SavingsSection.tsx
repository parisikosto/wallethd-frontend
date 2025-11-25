import { type JSX } from 'react';

import { formatCurrency } from '@/utils';

interface SavingsSectionProps {
  actualSavings: number;
  expectedSavings: number;
  isOnTrack: boolean;
}

export const SavingsSection = ({
  actualSavings,
  expectedSavings,
  isOnTrack,
}: SavingsSectionProps): JSX.Element => {
  return (
    <div className="bg-yellow-100 dark:bg-yellow-950/30 px-4 pt-3 pb-5">
      <h3 className="text-base font-bold mb-3 text-foreground">Savings</h3>
      <div className="flex justify-between items-center pt-2 mt-2">
        <span className="text-sm text-muted-foreground">
          [{formatCurrency(expectedSavings)}]
        </span>
        <span
          className={`text-sm font-medium ${
            isOnTrack
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {formatCurrency(actualSavings)}
        </span>
      </div>
    </div>
  );
};
