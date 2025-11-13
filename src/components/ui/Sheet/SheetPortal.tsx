'use client';

import type { ComponentProps, JSX } from 'react';
import { Portal } from '@radix-ui/react-dialog';

export const SheetPortal = ({
  ...props
}: ComponentProps<typeof Portal>): JSX.Element => {
  return <Portal data-slot="sheet-portal" {...props} />;
};
