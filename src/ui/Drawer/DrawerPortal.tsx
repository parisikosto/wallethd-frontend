import type { ComponentProps, JSX } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export const DrawerPortal = ({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Portal>): JSX.Element => {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
};
