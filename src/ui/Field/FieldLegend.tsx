import type { ComponentProps, JSX } from 'react';

import { cn } from '@/utils';

export const FieldLegend = ({
  className,
  variant = 'legend',
  ...props
}: ComponentProps<'legend'> & {
  variant?: 'legend' | 'label';
}): JSX.Element => {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        'mb-3 font-medium',
        'data-[variant=legend]:text-base',
        'data-[variant=label]:text-sm',
        className,
      )}
      {...props}
    />
  );
};
