import type { JSX } from 'react';

import { DataTable, SectionCards } from '@/components';

import data from './data.json';

export const DashboardPage = (): JSX.Element => {
  return (
    <>
      <SectionCards />
      <DataTable data={data} />
    </>
  );
};
