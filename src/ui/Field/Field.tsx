import type { ComponentProps, JSX } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import { fieldVariants } from './fieldVariants';

export const Field = ({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof fieldVariants>): JSX.Element => {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
};
