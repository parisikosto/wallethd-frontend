import type { ComponentProps, JSX } from 'react';
import { LoaderIcon } from 'lucide-react';

import { cn } from '@/utils';

export const Spinner = ({
  className,
  ...props
}: ComponentProps<'svg'>): JSX.Element => {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
};
