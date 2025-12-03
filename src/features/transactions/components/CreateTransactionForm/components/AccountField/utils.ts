import {
  Building2,
  CreditCard,
  Gift,
  Landmark,
  type LucideIcon,
  Ticket,
  Wallet,
} from 'lucide-react';

export const getAccountIcon = (name: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Cash: Wallet,
    Revolut: CreditCard,
    Payzy: CreditCard,
    'Ticket Restaurant': Ticket,
    'Ticket Compliment Card': Gift,
    'Debit Card': CreditCard,
    'Credit Card': CreditCard,
    'Bank Account': Landmark,
  };

  return iconMap[name] || Building2;
};

export const getAccountStyle = (
  name: string,
): {
  bgColor: string;
  imageUrl?: string;
  textColor: string;
  useImage?: boolean;
} => {
  const styleMap: Record<
    string,
    {
      bgColor: string;
      imageUrl?: string;
      textColor: string;
      useImage?: boolean;
    }
  > = {
    Cash: {
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-300',
    },
    Revolut: {
      bgColor: 'bg-violet-100 dark:bg-violet-900/30',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Revolut_logo.svg/512px-Revolut_logo.svg.png',
      textColor: 'text-violet-700 dark:text-violet-300',
      useImage: true,
    },
    Payzy: {
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
      textColor: 'text-cyan-700 dark:text-cyan-300',
    },
    'Ticket Restaurant': {
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-700 dark:text-orange-300',
    },
    'Ticket Compliment Card': {
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      textColor: 'text-pink-700 dark:text-pink-300',
    },
    'Debit Card': {
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-700 dark:text-blue-300',
    },
    'Credit Card': {
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-700 dark:text-red-300',
    },
    'Bank Account': {
      bgColor: 'bg-slate-100 dark:bg-slate-800/50',
      textColor: 'text-slate-700 dark:text-slate-300',
    },
  };

  return (
    styleMap[name] || {
      bgColor: 'bg-gray-100 dark:bg-gray-800/50',
      textColor: 'text-gray-700 dark:text-gray-300',
    }
  );
};
