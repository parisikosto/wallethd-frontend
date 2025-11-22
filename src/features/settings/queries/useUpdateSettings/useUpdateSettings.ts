import toast from 'react-hot-toast';
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  type ApiGenericResponse,
  type Settings,
  updateSettingsApi,
  type UpdateSettingsReqData,
} from '@/api';

import { settingsQueryKey } from '../useSettings';

export const useUpdateSettings = (): {
  isPendingUpdate: boolean;
  updateSettings: UseMutateFunction<
    ApiGenericResponse<Settings>,
    Error,
    UpdateSettingsReqData,
    unknown
  >;
} => {
  const queryClient = useQueryClient();

  const { isPending: isPendingUpdate, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [settingsQueryKey] });
      toast.success('Settings updated successfully');
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error('Failed to update settings');
      }
    },
  });

  return { updateSettings, isPendingUpdate };
};
