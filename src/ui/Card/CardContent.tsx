import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const CardContent = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  );
};
