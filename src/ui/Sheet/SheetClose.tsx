import type { ComponentProps, JSX } from 'react';
import { Close } from '@radix-ui/react-dialog';

export const SheetClose = ({
  ...props
}: ComponentProps<typeof Close>): JSX.Element => {
  return <Close data-slot="sheet-close" {...props} />;
};
