import type { ComponentProps, JSX } from 'react';
import { Value } from '@radix-ui/react-select';

export const SelectValue = ({
  ...props
}: ComponentProps<typeof Value>): JSX.Element => {
  return <Value data-slot="select-value" {...props} />;
};
