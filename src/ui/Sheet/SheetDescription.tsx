import type { ComponentProps, JSX } from 'react';
import { Description } from '@radix-ui/react-dialog';

import { cn } from '@/utils';

export const SheetDescription = ({
  className,
  ...props
}: ComponentProps<typeof Description>): JSX.Element => {
  return (
    <Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
};
