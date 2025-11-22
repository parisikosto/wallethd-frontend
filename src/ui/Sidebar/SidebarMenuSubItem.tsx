import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const SidebarMenuSubItem = ({
  className,
  ...props
}: ComponentProps<'li'>): JSX.Element => {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  );
};
