import type { ComponentProps, JSX } from 'react';
import { Portal } from '@radix-ui/react-dropdown-menu';

export const DropdownMenuPortal = ({
  ...props
}: ComponentProps<typeof Portal>): JSX.Element => {
  return <Portal data-slot="dropdown-menu-portal" {...props} />;
};
