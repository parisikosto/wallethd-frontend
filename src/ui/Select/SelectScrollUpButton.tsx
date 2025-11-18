import type { ComponentProps, JSX } from 'react';
import { ScrollUpButton } from '@radix-ui/react-select';
import { ChevronUpIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const SelectScrollUpButton = ({
  className,
  ...props
}: ComponentProps<typeof ScrollUpButton>): JSX.Element => {
  return (
    <ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </ScrollUpButton>
  );
};
