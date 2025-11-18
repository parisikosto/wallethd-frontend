import type { ComponentProps, JSX } from 'react';
import { ScrollDownButton } from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export const SelectScrollDownButton = ({
  className,
  ...props
}: ComponentProps<typeof ScrollDownButton>): JSX.Element => {
  return (
    <ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </ScrollDownButton>
  );
};
