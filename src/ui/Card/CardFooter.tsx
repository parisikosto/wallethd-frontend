import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const CardFooter = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
};
