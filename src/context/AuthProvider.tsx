import { useState, FC } from 'react';

import Cookies from 'js-cookie';

import AuthContext from '@/context/AuthContext';
import { IUser } from '@/interfaces/userInterface';
import { IAuthProviderProps, ILogoutResponse } from '@/interfaces/authInterface';
import { ILoginData } from '@/interfaces/loginInterface';
import login from '@/api/auth/login';
import authLogout from '@/api/auth/authLogout';
import { IGenericError } from '@/interfaces/errorInterface';

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const storedUser = Cookies.get('user');

    return storedUser ? true : false;
  });

  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = Cookies.get('user');

    return storedUser ? JSON.parse(storedUser) : null;
  });

  const authenticate = async (loginData: ILoginData): Promise<void | IGenericError> => {
    try {
      setLoading(true);

      const response = await login(loginData);

      if ('error' in response) {
        return response;
      }

      if (response) {
        setUser(response);
        setIsLoggedIn(true);

        Cookies.set('user', JSON.stringify(response), {
          expires: 1,
          secure: true,
          sameSite: 'none'
        });
      }

      return;
    } catch (_error) {
      setUser(null);
      setIsLoggedIn(false);

      const errorMessage: IGenericError = {
        error: true,
        message: 'erro ao fazer login',
        statusCode: 400
      };

      return errorMessage;
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

    Cookies.remove('user');
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
