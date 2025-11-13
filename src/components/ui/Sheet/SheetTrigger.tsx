'use client';

import type { ComponentProps, JSX } from 'react';
import { Trigger } from '@radix-ui/react-dialog';

export const SheetTrigger = ({
  ...props
}: ComponentProps<typeof Trigger>): JSX.Element => {
  return <Trigger data-slot="sheet-trigger" {...props} />;
};
