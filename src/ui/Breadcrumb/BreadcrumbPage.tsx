import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const BreadcrumbPage = ({
  className,
  ...props
}: ComponentProps<'span'>): JSX.Element => {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('text-foreground font-normal', className)}
      {...props}
    />
  );
};
