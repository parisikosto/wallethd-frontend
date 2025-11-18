import type { ComponentProps, JSX } from 'react';
import { Root } from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

export const Tabs = ({
  className,
  ...props
}: ComponentProps<typeof Root>): JSX.Element => {
  return (
    <Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
};
