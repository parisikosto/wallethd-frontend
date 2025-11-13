import type { ComponentProps, JSX } from 'react';

import { cn } from '@/lib/utils';

export const SidebarHeader = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
};
