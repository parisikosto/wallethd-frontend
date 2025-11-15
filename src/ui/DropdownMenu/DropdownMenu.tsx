import type { ComponentProps, JSX } from 'react';
import { Root } from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = ({
  ...props
}: ComponentProps<typeof Root>): JSX.Element => {
  return <Root data-slot="dropdown-menu" {...props} />;
};
