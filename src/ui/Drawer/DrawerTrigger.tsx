import type { ComponentProps, JSX } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export const DrawerTrigger = ({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Trigger>): JSX.Element => {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
};
