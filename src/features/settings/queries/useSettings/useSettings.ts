import { useQuery } from '@tanstack/react-query';

import { getSettingsApi, type Settings } from '@/api';

export const settingsQueryKey = ['settings'];

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
  });

  return {
    isErrorSettings,
    isFetchingSettings,
    settings: settingsData?.data,
  };
};
