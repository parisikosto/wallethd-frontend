export interface LoginReqData {
  email: string;
  password: string;
}

export interface LoginResData {
  error?: string;
  success: boolean;
  token?: string;
}

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
