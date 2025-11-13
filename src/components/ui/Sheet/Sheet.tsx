import type { ComponentProps, JSX } from 'react';
import { Root } from '@radix-ui/react-dialog';

export const Sheet = ({
  ...props
}: ComponentProps<typeof Root>): JSX.Element => {
  return <Root data-slot="sheet" {...props} />;
};
