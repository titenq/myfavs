import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '@/context/AuthContext';
import { IProtectedRouteProps } from '@/interfaces/protectedRouteInterface';

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  } 
  
  return children;
};

export default ProtectedRoute;
