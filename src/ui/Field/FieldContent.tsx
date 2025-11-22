import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const FieldContent = ({
  className,
  ...props
}: ComponentProps<'div'>): JSX.Element => {
  return (
    <div
      data-slot="field-content"
      className={cn(
        'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
        className,
      )}
      {...props}
    />
  );
};
