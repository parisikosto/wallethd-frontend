import { axiosInstance } from '../axiosInstance';
import { LOCAL_STORAGE_TOKEN_NAME } from '../config';
import type { LoginReqData, LoginResData } from '../interfaces';

const authUrl = '/v1/auth';

/**
 * @desc    Login user
 * @route   POST /v1/auth/login
 * @access  Public
 */
export const loginApi = async (
  reqData: LoginReqData,
): Promise<LoginResData> => {
  const res = await axiosInstance.post(`${authUrl}/login`, reqData);

  const { token } = res.data;

  if (token) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return res.data;
};
