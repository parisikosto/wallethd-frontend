import type { ComponentProps, JSX } from 'react';
import { Root, TooltipProvider } from '@radix-ui/react-tooltip';

export const Tooltip = ({
  ...props
}: ComponentProps<typeof Root>): JSX.Element => {
  return (
    <TooltipProvider>
      <Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
};
