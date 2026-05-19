export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ENV_SUFFIX =
  import.meta.env.MODE === 'production' ? '' : `-${import.meta.env.MODE}`;

export const LOCAL_STORAGE_APP_NAME = `@wallethd${ENV_SUFFIX}`;

export const LOCAL_STORAGE_TOKEN_NAME = `@wallethd${ENV_SUFFIX}-token`;
