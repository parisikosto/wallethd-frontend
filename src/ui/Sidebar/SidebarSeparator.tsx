import type { ComponentProps, JSX } from 'react';

import { Separator } from '@/ui/Separator';
import { cn } from '@/utils';

export const SidebarSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>): JSX.Element => {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  );
};
