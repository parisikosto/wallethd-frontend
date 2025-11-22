import type { JSX } from 'react';
import { Root } from '@radix-ui/react-toggle-group';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

import { ToggleGroupContext } from './ToggleGroupContext';
import { toggleVariants } from './toggleVariants';

export const ToggleGroup = ({
  children,
  className,
  size,
  spacing = 0,
  variant,
  ...props
}: React.ComponentProps<typeof Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }): JSX.Element => {
  return (
    <Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ '--gap': spacing } as React.CSSProperties}
      className={cn(
        'group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs',
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </Root>
  );
};
