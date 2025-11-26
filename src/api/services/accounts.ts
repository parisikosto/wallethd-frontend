import { axiosInstance } from '../axiosInstance';
import type { Account, ApiGenericResponse } from '../interfaces';

const accountsUrl = '/v1/accounts';

/**
 * @desc    Get accounts
 * @route   GET /v1/accounts
 * @access  Private
 */
export const getAccountsApi = async (): Promise<
  ApiGenericResponse<Account[]>
> => {
  const res = await axiosInstance.get(`${accountsUrl}`);
  return res.data;
};
