export interface RegisterReqData {
  email: string;
  password: string;
  username: string;
}

export interface RegisterResData {
  error?: string;
  success: boolean;
  token?: string;
}

export type LoginReqData = Pick<RegisterReqData, 'email' | 'password'>;

export type LoginResData = RegisterResData;

export interface UserProfile {
  _id: string;
  createdAt: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage: string;
  updatedAt: string;
  username: string;
}
