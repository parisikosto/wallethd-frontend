import type { ComponentProps, JSX } from 'react';

import { cn } from '@/lib/utils';

export const Table = ({
  className,
  ...props
}: ComponentProps<'table'>): JSX.Element => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
};
