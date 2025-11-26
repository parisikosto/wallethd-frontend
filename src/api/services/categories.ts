import { axiosInstance } from '../axiosInstance';
import type { ApiGenericResponse, Category } from '../interfaces';

const categoriesUrl = '/v1/categories';

/**
 * @desc    Get categories
 * @route   GET /v1/categories
 * @access  Private
 */
export const getCategoriesApi = async (): Promise<
  ApiGenericResponse<Category[]>
> => {
  const res = await axiosInstance.get(`${categoriesUrl}`);
  return res.data;
};
