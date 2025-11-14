export interface LoginReqData {
  email: string;
  password: string;
}

export interface LoginResData {
  error?: string;
  success: boolean;
  token?: string;
}
