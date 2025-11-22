import type { ComponentProps, JSX } from 'react';
import { Separator } from '@radix-ui/react-select';

import { cn } from '@/utils';

export const SelectSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>): JSX.Element => {
  return (
    <Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
};
