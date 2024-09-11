import { createContext } from 'react';

import { IAuthContext } from '@/interfaces/authInterface';

const defaultAuthContext: IAuthContext = {
  isLoggedIn: false,
  user: null,
  authenticate: async () => { },
  logout: () => { },
  error: null,
  loading: false
};

const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export default AuthContext;
