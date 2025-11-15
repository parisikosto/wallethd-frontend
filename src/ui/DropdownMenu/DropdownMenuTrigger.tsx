import type { ComponentProps, JSX } from 'react';
import { Trigger } from '@radix-ui/react-dropdown-menu';

export const DropdownMenuTrigger = ({
  ...props
}: ComponentProps<typeof Trigger>): JSX.Element => {
  return <Trigger data-slot="dropdown-menu-trigger" {...props} />;
};
