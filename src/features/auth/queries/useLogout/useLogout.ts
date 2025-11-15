import { useNavigate } from 'react-router-dom';
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { type ApiGenericResponse, logoutApi } from '@/api';

export const useLogout = (): {
  isPendingLogout: boolean;
  logout: UseMutateFunction<ApiGenericResponse<object>, Error, void, unknown>;
} => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isPendingLogout, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isPendingLogout };
};
