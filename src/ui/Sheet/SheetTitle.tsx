import type { ComponentProps, JSX } from 'react';
import { Title } from '@radix-ui/react-dialog';

import { cn } from '@/utils';

export const SheetTitle = ({
  className,
  ...props
}: ComponentProps<typeof Title>): JSX.Element => {
  return (
    <Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
};
