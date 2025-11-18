import type { ComponentProps, JSX } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/lib/utils';

export const DrawerTitle = ({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Title>): JSX.Element => {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
};
