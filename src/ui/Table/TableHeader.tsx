import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const TableHeader = ({
  className,
  ...props
}: ComponentProps<'thead'>): JSX.Element => {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
};
