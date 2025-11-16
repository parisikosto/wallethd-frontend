import type { ComponentProps, JSX } from 'react';
import { Root } from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';

export const Avatar = ({
  className,
  ...props
}: ComponentProps<typeof Root>): JSX.Element => {
  return (
    <Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  );
};
