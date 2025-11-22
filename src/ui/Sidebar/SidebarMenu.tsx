import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const SidebarMenu = ({
  className,
  ...props
}: ComponentProps<'ul'>): JSX.Element => {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
};
