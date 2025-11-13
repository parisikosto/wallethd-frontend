import type { ComponentProps, JSX } from 'react';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: ComponentProps<'li'>): JSX.Element => {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};
