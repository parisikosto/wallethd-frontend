import type { ComponentProps, JSX } from 'react';

import { cn } from '@/lib/utils';

export const TableCell = ({
  className,
  ...props
}: ComponentProps<'td'>): JSX.Element => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
};
