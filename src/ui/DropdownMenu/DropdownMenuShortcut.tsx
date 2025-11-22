import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const DropdownMenuShortcut = ({
  className,
  ...props
}: ComponentProps<'span'>): JSX.Element => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
};
