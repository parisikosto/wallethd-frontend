import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const Skeleton = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
};
