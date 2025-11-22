import type { ComponentProps, JSX } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import { buttonVariants } from './buttonVariants';

export const Button = ({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }): JSX.Element => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
