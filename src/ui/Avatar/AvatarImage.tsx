import type { ComponentProps, JSX } from 'react';
import { Image } from '@radix-ui/react-avatar';

import { cn } from '@/utils';

export const AvatarImage = ({
  className,
  ...props
}: ComponentProps<typeof Image>): JSX.Element => {
  return (
    <Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  );
};
