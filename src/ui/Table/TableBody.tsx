import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const TableBody = ({
  className,
  ...props
}: ComponentProps<'tbody'>): JSX.Element => {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
};
