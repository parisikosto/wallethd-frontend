import type { ComponentProps, JSX } from 'react';
import { Content } from '@radix-ui/react-tabs';

import { cn } from '@/utils';

export const TabsContent = ({
  className,
  ...props
}: ComponentProps<typeof Content>): JSX.Element => {
  return (
    <Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
};
