import type { ComponentProps, JSX, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Separator } from '../Separator';

export const FieldSeparator = ({
  children,
  className,
  ...props
}: ComponentProps<'div'> & {
  children?: ReactNode;
}): JSX.Element => {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
};
