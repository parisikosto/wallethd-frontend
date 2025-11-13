import type { ComponentProps, JSX } from 'react';
import { Trigger } from '@radix-ui/react-tooltip';

export const TooltipTrigger = ({
  ...props
}: ComponentProps<typeof Trigger>): JSX.Element => {
  return <Trigger data-slot="tooltip-trigger" {...props} />;
};
