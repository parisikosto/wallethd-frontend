import { axiosInstance } from '../axiosInstance';
import type { ApiGenericResponse, Transaction } from '../interfaces';

const transactionsUrl = '/v1/transactions';

/**
 * @desc    Get transactions
 * @route   GET /v1/transactions
 * @access  Private
 */
export const getTransactionsApi = async (): Promise<
  ApiGenericResponse<Transaction[]>
> => {
  const res = await axiosInstance.get(`${transactionsUrl}`);
  return res.data;
};
