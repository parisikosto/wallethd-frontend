import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
};
