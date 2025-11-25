import { type JSX } from 'react';

import { formatCurrency } from '@/utils';

import { getWeeksInMonth } from './utils';

interface WantsSectionProps {
  currentYear: number;
  monthIndex: number;
  wantsBudget: number;
}

export const WantsSection = ({
  currentYear,
  monthIndex,
  wantsBudget,
}: WantsSectionProps): JSX.Element => {
  const weeks = getWeeksInMonth(monthIndex, currentYear);
  const budgetPerWeek = weeks.length > 0 ? wantsBudget / weeks.length : 0;

  return (
    <div
      data-section="wants"
      className="bg-orange-100 dark:bg-orange-950/30 px-4 pt-3 pb-5"
    >
      <h3 className="text-base font-bold mb-3 text-foreground">Wants</h3>
      <div className="space-y-2">
        {weeks.map((week, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{week.label}</span>
            <span className="text-foreground">
              {formatCurrency(budgetPerWeek)}
            </span>
          </div>
        ))}
        <div className="flex justify-end pt-2 mt-2 border-t border-gray-400 dark:border-gray-600">
          <span className="text-base text-foreground font-medium">
            {formatCurrency(wantsBudget)}
          </span>
        </div>
      </div>
    </div>
  );
};
