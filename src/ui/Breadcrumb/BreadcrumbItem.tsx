import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const BreadcrumbItem = ({
  className,
  ...props
}: ComponentProps<'li'>): JSX.Element => {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
};
