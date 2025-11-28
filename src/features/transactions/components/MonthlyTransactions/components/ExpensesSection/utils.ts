import type { Transaction } from '@/api';

export const getInstallmentIconColor = (transaction: Transaction): string => {
  if (transaction.status === 'pending') {
    if (transaction.isReadyToDeduct) {
      // Blue: pending && isReadyToDeduct
      return 'text-blue-600 dark:text-blue-400';
    } else {
      // Red: pending && !isReadyToDeduct
      return 'text-red-600 dark:text-red-400';
    }
  } else {
    // completed
    if (transaction.isReadyToDeduct) {
      // Green: completed && isReadyToDeduct
      return 'text-green-600 dark:text-green-400';
    } else {
      // Orange: completed && !isReadyToDeduct
      return 'text-orange-600 dark:text-orange-400';
    }
  }
};
