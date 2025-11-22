/**
 * Currency formatting utilities
 */

/**
 * Format a number as currency
 * @param amount - The amount to format (can be a number or string)
 * @param currency - The currency code (default: 'EUR')
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(4055) // "€4,055.00"
 * formatCurrency(1234.56, 'USD') // "$1,234.56"
 * formatCurrency(1234.56, 'EUR', 'de-DE') // "1.234,56 €"
 */
export const formatCurrency = (
  amount: number | string,
  currency: string = 'EUR',
  locale: string = 'en-US',
): string => {
  if (amount === '-' || amount === undefined || amount === null) {
    return '-';
  }

  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return '-';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(numAmount);
};
