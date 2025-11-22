import type { ComponentProps, JSX } from 'react';
import { Root } from '@radix-ui/react-toggle';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import { toggleVariants } from './toggleVariants';

export const Toggle = ({
  className,
  size,
  variant,
  ...props
}: ComponentProps<typeof Root> &
  VariantProps<typeof toggleVariants>): JSX.Element => {
  return (
    <Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
};
