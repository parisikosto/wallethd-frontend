import type { ComponentProps, JSX } from 'react';
import { Root } from '@radix-ui/react-select';

export const Select = ({
  ...props
}: ComponentProps<typeof Root>): JSX.Element => {
  return <Root data-slot="select" {...props} />;
};
