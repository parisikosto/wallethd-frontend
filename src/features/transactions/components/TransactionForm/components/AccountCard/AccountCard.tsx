import { type JSX, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

import { Card } from '@/ui';
import { cn } from '@/utils';

interface AccountStyle {
  bgColor: string;
  imageUrl?: string;
  textColor: string;
  useImage?: boolean;
}

interface AccountCardProps {
  account: { _id: string; name: string };
  accountStyle: AccountStyle;
  Icon: LucideIcon;
  isSelected: boolean;
  onSelect: () => void;
}

export const AccountCard = ({
  Icon,
  account,
  accountStyle,
  isSelected,
  onSelect,
}: AccountCardProps): JSX.Element => {
  const [imageError, setImageError] = useState(false);
  const showImage =
    accountStyle.useImage && accountStyle.imageUrl && !imageError;

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all hover:shadow-md py-1 rounded-none aspect-square border-0 w-full',
        accountStyle.bgColor,
        isSelected && 'ring-2 ring-primary ring-offset-2',
      )}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="px-1 py-1 h-full flex flex-col items-center justify-center gap-1 text-center">
        {showImage ? (
          <img
            src={accountStyle.imageUrl}
            alt={account.name}
            className="size-6 object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <Icon
            className={cn(
              'size-4',
              isSelected ? 'text-primary' : accountStyle.textColor,
            )}
          />
        )}
        <div
          className={cn(
            'text-[10px] font-medium leading-tight',
            isSelected ? 'text-primary' : accountStyle.textColor,
          )}
        >
          {account.name}
        </div>
      </div>
    </Card>
  );
};
