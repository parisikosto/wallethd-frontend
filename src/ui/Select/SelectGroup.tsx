import type { ComponentProps, JSX } from 'react';
import { Group } from '@radix-ui/react-select';

export const SelectGroup = ({
  ...props
}: ComponentProps<typeof Group>): JSX.Element => {
  return <Group data-slot="select-group" {...props} />;
};
