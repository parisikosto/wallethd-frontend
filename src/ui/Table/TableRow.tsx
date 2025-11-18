import type { ComponentProps, JSX } from 'react';

import { cn } from '@/lib/utils';

export const TableRow = ({
  className,
  ...props
}: ComponentProps<'tr'>): JSX.Element => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  );
};
