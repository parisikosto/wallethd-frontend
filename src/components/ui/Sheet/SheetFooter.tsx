import type { ComponentProps, JSX } from 'react';

import { cn } from '@/lib/utils';

export const SheetFooter = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
};
