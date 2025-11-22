import { type ComponentProps, type JSX, useContext } from 'react';
import { Item } from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import { ToggleGroupContext } from './ToggleGroupContext';
import { toggleVariants } from './toggleVariants';

export const ToggleGroupItem = ({
  children,
  className,
  size,
  variant,
  ...props
}: ComponentProps<typeof Item> &
  VariantProps<typeof toggleVariants>): JSX.Element => {
  const context = useContext(ToggleGroupContext);

  return (
    <Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10',
        'data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l',
        className,
      )}
      {...props}
    >
      {children}
    </Item>
  );
};
