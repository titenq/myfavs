import { ReactNode } from 'react';

import { IUser } from '@/interfaces/userInterface';
import { ILoginData } from '@/interfaces/loginInterface';

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  user: IUser | null;
  authenticate: (loginData: ILoginData) => Promise<void>;
  logout: () => void;
  error: string | null;
  loading: boolean;
}

export interface IVerifyEmailData {
  token: string;
}

export interface ILogoutResponse {
  message: string;
}

export interface IResendLink {
  email: string;
}

export interface IResendLinkResponse {
  message: string;
}

export interface IResetPassword {
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordData {
  token: string;
  password: string;
}
