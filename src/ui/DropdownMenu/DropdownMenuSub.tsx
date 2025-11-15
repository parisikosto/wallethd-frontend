import type { ComponentProps, JSX } from 'react';
import { Sub } from '@radix-ui/react-dropdown-menu';

export const DropdownMenuSub = ({
  ...props
}: ComponentProps<typeof Sub>): JSX.Element => {
  return <Sub data-slot="dropdown-menu-sub" {...props} />;
};
