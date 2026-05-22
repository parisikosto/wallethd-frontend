import type { JSX } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { SectionCards, SpinnerCustom } from '@/components';
import { MonthlyTransactions, useTransactionsYears } from '@/features';

export const YearSummaryPage = (): JSX.Element => {
  const { year: yearParam } = useParams<{ year: string }>();
  const year = Number(yearParam);
  const { isFetchingTransactionsYears, transactionsYears } =
    useTransactionsYears();

  if (!yearParam || Number.isNaN(year) || year < 1900 || year > 2100) {
    return <Navigate to="/" replace />;
  }

  if (isFetchingTransactionsYears) {
    return <SpinnerCustom />;
  }

  if (!transactionsYears?.includes(year)) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <SectionCards year={year} />
      <MonthlyTransactions year={year} />
    </>
  );
};
