import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const TableCaption = ({
  className,
  ...props
}: ComponentProps<'caption'>): JSX.Element => {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
};
