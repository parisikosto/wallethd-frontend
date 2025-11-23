import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getSettingsApi, type Settings } from '@/api';
import { LOCAL_STORAGE_APP_NAME } from '@/api';

export const settingsQueryKey = 'settings';

export const useSettings = (): {
  isErrorSettings: boolean;
  isFetchingSettings: boolean;
  settings: Settings | undefined;
} => {
  const {
    data: settingsData,
    isError: isErrorSettings,
    isFetching: isFetchingSettings,
  } = useQuery({
    queryFn: () => getSettingsApi(),
    queryKey: [settingsQueryKey],
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (settingsData?.data) {
      const { defaultCurrency, firstDayOfMonth, locale, showDeletedMedia } =
        settingsData.data;

      try {
        localStorage.setItem(
          LOCAL_STORAGE_APP_NAME,
          JSON.stringify({
            defaultCurrency,
            firstDayOfMonth,
            locale,
            showDeletedMedia,
          }),
        );
      } catch {
        // silently fail if localStorage is not available
      }
    }
  }, [settingsData]);

  return {
    isErrorSettings,
    isFetchingSettings,
    settings: settingsData?.data,
  };
};
