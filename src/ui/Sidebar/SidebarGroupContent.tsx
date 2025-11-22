import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const SidebarGroupContent = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
};
