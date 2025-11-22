import type { ComponentProps, JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/Tooltip';
import { cn } from '@/utils';

import { useSidebar } from './contexts';
import { sidebarMenuButtonVariants } from './sidebarMenuButtonVariants';

export const SidebarMenuButton = ({
  asChild = false,
  className,
  isActive = false,
  size = 'default',
  tooltip,
  variant = 'default',
  ...props
}: ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>): JSX.Element => {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
};
