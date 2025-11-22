import type { ComponentProps, JSX } from 'react';
import { Separator } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/utils';

export const DropdownMenuSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>): JSX.Element => {
  return (
    <Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
};
