import type { ComponentProps, JSX } from 'react';
import { Provider } from '@radix-ui/react-tooltip';

export const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof Provider>): JSX.Element => {
  return (
    <Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
};
