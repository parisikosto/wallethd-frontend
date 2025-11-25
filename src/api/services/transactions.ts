import { axiosInstance } from '../axiosInstance';
import type {
  ApiGenericResponse,
  Transaction,
  TransactionsMonthlyData,
  TransactionSummary,
} from '../interfaces';

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

/**
 * @desc    Get transactions for a year grouped by month
 * @route   GET /v1/transactions/monthly
 * @access  Private
 */
export const getTransactionsByMonthApi = async (
  year?: number,
): Promise<ApiGenericResponse<TransactionsMonthlyData[]>> => {
  const params = year ? { year: year.toString() } : {};
  const res = await axiosInstance.get(`${transactionsUrl}/monthly`, { params });
  return res.data;
};

/**
 * @desc    Get transactions summary
 * @route   GET /v1/transactions/summary
 * @access  Private
 */
export const getTransactionsSummaryApi = async (): Promise<
  ApiGenericResponse<TransactionSummary>
> => {
  const res = await axiosInstance.get(`${transactionsUrl}/summary`);
  return res.data;
};
