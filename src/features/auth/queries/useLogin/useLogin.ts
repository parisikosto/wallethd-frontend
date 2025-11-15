import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { type UseMutateFunction, useMutation } from '@tanstack/react-query';

import { loginApi, type LoginReqData, type LoginResData } from '@/api';

export const useLogin = (): {
  isPendingLogin: boolean;
  login: UseMutateFunction<LoginResData, Error, LoginReqData, unknown>;
} => {
  const navigate = useNavigate();

  const { isPending: isPendingLogin, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate('/', { replace: true });
      toast.success('User logged in successfully');
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast.error('Provided email or password are incorrect');
      }
    },
  });

  return { login, isPendingLogin };
};
