import { type ComponentType, createContext, type ReactNode } from 'react';

import type { THEMES } from '@/constants';

export type ChartConfig = {
  [k in string]: {
    icon?: ComponentType;
    label?: ReactNode;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

export type ChartContextProps = {
  config: ChartConfig;
};

export const ChartContext = createContext<ChartContextProps | null>(null);
