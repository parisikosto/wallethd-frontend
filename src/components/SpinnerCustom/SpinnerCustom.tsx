import type { JSX } from 'react';

import { Spinner } from '@/ui';

export const SpinnerCustom = (): JSX.Element => {
  return (
    <div className="flex h-svh items-center justify-center gap-4">
      <Spinner className="size-10" />
    </div>
  );
};
