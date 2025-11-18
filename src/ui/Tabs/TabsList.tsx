import type { ComponentProps, JSX } from 'react';
import { List } from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

export const TabsList = ({
  className,
  ...props
}: ComponentProps<typeof List>): JSX.Element => {
  return (
    <List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  );
};
