import type { ComponentProps, JSX } from 'react';
import { PanelLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

import { useSidebar } from './contexts';

export const SidebarTrigger = ({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button>): JSX.Element => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
