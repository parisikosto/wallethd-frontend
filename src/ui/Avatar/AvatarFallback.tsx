import type { ComponentProps, JSX } from 'react';
import { Fallback } from '@radix-ui/react-avatar';

import { cn } from '@/utils';

export const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof Fallback>): JSX.Element => {
  return (
    <Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  );
};
