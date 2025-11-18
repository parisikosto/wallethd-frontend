import type { ComponentProps, JSX } from 'react';
import { Label } from '@radix-ui/react-select';

import { cn } from '@/lib/utils';

export const SelectLabel = ({
  className,
  ...props
}: ComponentProps<typeof Label>): JSX.Element => {
  return (
    <Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  );
};
