import { LOCAL_STORAGE_APP_NAME } from '@/api';

const getLocalStorageItems = (): {
  defaultCurrency: string;
  locale: string;
} => {
  try {
    const appStorageStr = localStorage.getItem(LOCAL_STORAGE_APP_NAME);

    if (appStorageStr) {
      const appStorage = JSON.parse(appStorageStr);

      return {
        defaultCurrency: appStorage.defaultCurrency || 'EUR',
        locale: appStorage.locale || 'en-US',
      };
    }
  } catch {
    // Silently fail if localStorage is not available or data is corrupted
  }

  return {
    defaultCurrency: 'EUR',
    locale: 'en-US',
  };
};

/**
 * Format a number as currency
 * @param amount - The amount to format (can be a number or string)
 * @param currency - The currency code (optional, will use user's default from settings)
 * @param locale - The locale for formatting (optional, will use user's locale from settings)
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(4055) // Uses user's currency and locale from settings
 * formatCurrency(1234.56, 'USD') // "$1,234.56" with user's locale
 * formatCurrency(1234.56, 'EUR', 'de-DE') // "1.234,56 €" with custom locale
 */
export const formatCurrency = (amount: number | string): string => {
  if (amount === '-' || amount === undefined || amount === null) {
    return '-';
  }

  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return '-';
  }

  const { defaultCurrency, locale } = getLocalStorageItems();

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: defaultCurrency,
  }).format(numAmount);
};
