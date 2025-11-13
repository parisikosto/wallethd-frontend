import type { ComponentProps, JSX } from 'react';

import { cn } from '@/lib/utils';

export const CardTitle = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
};
