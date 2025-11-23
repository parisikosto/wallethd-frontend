import { axiosInstance } from '@/api/axiosInstance';
import { LOCAL_STORAGE_APP_NAME, LOCAL_STORAGE_TOKEN_NAME } from '@/api/config';

/**
 * Set authentication token in localStorage and axios headers
 * Used after successful login or registration
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, token);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * Clear all authentication data from localStorage and axios headers
 * Used on logout or when receiving 401 errors
 */
export const clearAuthData = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_APP_NAME);
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  delete axiosInstance.defaults.headers.common['Authorization'];
};
