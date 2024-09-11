import { ReactNode } from 'react';

import { IUser } from './userInterface';
import { ILoginData } from './loginInterface';

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  user: IUser | null;
  authenticate: (loginData: ILoginData) => void;
  logout: () => void;
  error: string | null;
  loading: boolean;
}
