import { useContext } from 'react';

import { ChartContext, type ChartContextProps } from './ChartContext';

export const useChart = (): ChartContextProps => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
};
