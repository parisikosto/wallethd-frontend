import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const SidebarMenuItem = ({
  className,
  ...props
}: ComponentProps<'li'>): JSX.Element => {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
};
