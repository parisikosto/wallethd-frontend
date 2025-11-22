import type { ComponentProps, JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils';

export const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: ComponentProps<'a'> & {
  asChild?: boolean;
}): JSX.Element => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('hover:text-foreground transition-colors', className)}
      {...props}
    />
  );
};
