import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const SheetHeader = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
};
