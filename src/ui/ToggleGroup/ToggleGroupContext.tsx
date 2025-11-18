import { createContext } from 'react';
import type { VariantProps } from 'class-variance-authority';

import type { toggleVariants } from './toggleVariants';

export const ToggleGroupContext = createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }
>({
  size: 'default',
  variant: 'default',
  spacing: 0,
});
