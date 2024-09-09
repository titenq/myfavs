import { ReactNode } from 'react';

import { IUser } from './userInterface';

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}
