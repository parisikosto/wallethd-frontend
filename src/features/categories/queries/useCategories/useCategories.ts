import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

import {
  type ApiGenericResponse,
  type Category,
  getCategoriesApi,
} from '@/api';

export const categoriesQueryKey = 'categories';

export const useCategories = (): {
  categories: Category[] | undefined;
  isErrorCategories: boolean;
  isFetchingCategories: boolean;
  refetchCategories: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ApiGenericResponse<Category[]>, Error>>;
} => {
  const {
    data: categoriesData,
    isError: isErrorCategories,
    isFetching: isFetchingCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryFn: () => getCategoriesApi(),
    queryKey: [categoriesQueryKey],
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    categories: categoriesData?.data,
    isErrorCategories,
    isFetchingCategories,
    refetchCategories,
  };
};
