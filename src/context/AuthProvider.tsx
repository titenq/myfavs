import { useState, FC } from 'react';

import AuthContext from '@/context/AuthContext';
import { IUser } from '@/interfaces/userInterface';
import { IAuthProviderProps, ILogoutResponse } from '@/interfaces/authInterface';
import { ILoginData } from '@/interfaces/loginInterface';
import login from '@/api/auth/login';
import authLogout from '@/api/auth/authLogout';
import { IGenericError } from '@/interfaces/errorInterface';

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const authenticate = async (loginData: ILoginData): Promise<void> => {
    try {
      setError(null);
      setLoading(true);

      const response = await login(loginData);

      if ('error' in response) {
        setError(response.message);
        
        return;
      }

      if (response) {
        setUser(response);
        setIsLoggedIn(true);
      }

      return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('erro ao fazer login');
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const response: ILogoutResponse | IGenericError = await authLogout();

    if ('error' in response) {
      setError(response.message);
    }

    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={
        {
          authenticate,
          isLoggedIn,
          user,
          logout,
          error,
          loading
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
