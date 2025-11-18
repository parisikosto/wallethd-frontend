import type { ComponentProps, JSX } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

export const Drawer = ({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>): JSX.Element => {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
};
