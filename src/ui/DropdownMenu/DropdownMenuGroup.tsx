import type { ComponentProps, JSX } from 'react';
import { Group } from '@radix-ui/react-dropdown-menu';

export const DropdownMenuGroup = ({
  ...props
}: ComponentProps<typeof Group>): JSX.Element => {
  return <Group data-slot="dropdown-menu-group" {...props} />;
};
