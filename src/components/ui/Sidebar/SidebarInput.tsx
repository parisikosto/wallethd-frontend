import type { ComponentProps, JSX } from 'react';

import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

export const SidebarInput = ({
  className,
  ...props
}: ComponentProps<typeof Input>): JSX.Element => {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  );
};
