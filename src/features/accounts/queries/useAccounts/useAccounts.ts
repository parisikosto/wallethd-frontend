import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

import { type Account, type ApiGenericResponse, getAccountsApi } from '@/api';

export const accountsQueryKey = 'accounts';

export const useAccounts = (): {
  accounts: Account[] | undefined;
  isErrorAccounts: boolean;
  isFetchingAccounts: boolean;
  refetchAccounts: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ApiGenericResponse<Account[]>, Error>>;
} => {
  const {
    data: accountsData,
    isError: isErrorAccounts,
    isFetching: isFetchingAccounts,
    refetch: refetchAccounts,
  } = useQuery({
    queryFn: () => getAccountsApi(),
    queryKey: [accountsQueryKey],
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    accounts: accountsData?.data,
    isErrorAccounts,
    isFetchingAccounts,
    refetchAccounts,
  };
};
