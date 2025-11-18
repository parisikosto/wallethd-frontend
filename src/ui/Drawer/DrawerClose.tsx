import type { ComponentProps, JSX } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export const DrawerClose = ({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Close>): JSX.Element => {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
};
