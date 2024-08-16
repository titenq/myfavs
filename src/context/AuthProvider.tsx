import { useState, FC } from 'react';

import AuthContext from './AuthContext';
import IUser from '../interfaces/User/IUser';
import IAuthProviderProps from '../interfaces/Auth/IAuthProviderProps';

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const login = (user: IUser) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();

    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={
        {
          isLoggedIn,
          user,
          login,
          logout,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
