import { clearAuthData, setAuthToken } from '@/utils';

import { axiosInstance } from '../axiosInstance';
import type {
  ApiGenericResponse,
  LoginReqData,
  LoginResData,
  RegisterReqData,
  RegisterResData,
  UserProfile,
} from '../interfaces';

const authUrl = '/v1/auth';

/**
 * @desc    Register user
 * @route   POST /v1/auth/register
 * @access  Public
 */
export const registerApi = async (
  newUser: RegisterReqData,
): Promise<RegisterResData> => {
  const res = await axiosInstance.post(`${authUrl}/register`, newUser);

  const { token } = res.data;

  if (token) {
    setAuthToken(token);
  }

  return res.data;
};

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
    setAuthToken(token);
  }

  return res.data;
};

/**
 * @desc    Get current logged in user
 * @route   GET /v1/auth/profile
 * @access  Private
 */
export const getUserProfileApi = async (): Promise<
  ApiGenericResponse<UserProfile>
> => {
  const res = await axiosInstance.get(`${authUrl}/profile`);
  return res.data;
};

/**
 * @desc    Log user out / Clear cookie
 * @route   GET /v1/auth/logout
 * @access  Public
 */
export const logoutApi = async (): Promise<ApiGenericResponse<object>> => {
  const res = await axiosInstance.get(`${authUrl}/logout`);
  clearAuthData();
  return res.data;
};
