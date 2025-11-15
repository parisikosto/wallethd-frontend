import type { ComponentProps, JSX } from 'react';
import { RadioGroup } from '@radix-ui/react-dropdown-menu';

export const DropdownMenuRadioGroup = ({
  ...props
}: ComponentProps<typeof RadioGroup>): JSX.Element => {
  return <RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
};
