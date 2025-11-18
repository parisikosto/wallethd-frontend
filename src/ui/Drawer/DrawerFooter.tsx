import type { ComponentProps, JSX } from 'react';

import { cn } from '@/lib/utils';

export const DrawerFooter = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
};
