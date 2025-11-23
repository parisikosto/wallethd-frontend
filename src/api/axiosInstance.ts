import axios from 'axios';

import { clearAuthData } from '@/utils';

import { API_BASE_URL, LOCAL_STORAGE_TOKEN_NAME } from './config';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      clearAuthData();
    }
    return Promise.reject(error);
  },
);
