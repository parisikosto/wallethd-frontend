import { LOCAL_STORAGE_APP_NAME } from '@/api';

const getLocalStorageItems = (): {
  locale: string;
} => {
  try {
    const appStorageStr = localStorage.getItem(LOCAL_STORAGE_APP_NAME);

    if (appStorageStr) {
      const appStorage = JSON.parse(appStorageStr);

      return {
        locale: appStorage.locale || 'en-US',
      };
    }
  } catch {
    // silently fail if localStorage is not available or data is corrupted
  }

  return {
    locale: 'en-US',
  };
};

/**
 * Format a date string using the user's locale from settings
 *
 * @param dateString - The date string to format
 * @param options - Optional Intl.DateTimeFormatOptions to customize the format
 * @returns Formatted date string
 *
 * @example
 * formatDate('2024-01-15') // "15/01/2024"
 * formatDate('2024-01-15', { day: 'numeric', month: 'short' }) // Custom format with user's locale
 */
export const formatDate = (
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!dateString) {
    return '-';
  }

  const datePart = dateString.split('T')[0];
  const [year, month, day] = datePart.split('-');

  if (!year || !month || !day) {
    return '-';
  }

  if (options) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return '-';
    }

    const { locale } = getLocalStorageItems();

    return date.toLocaleDateString(locale, options);
  }

  return `${day}/${month}/${year}`;
};
