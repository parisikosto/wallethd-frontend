import type { ComponentProps, JSX } from 'react';
import { Label } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/utils';

export const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: ComponentProps<typeof Label> & {
  inset?: boolean;
}): JSX.Element => {
  return (
    <Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className,
      )}
      {...props}
    />
  );
};
