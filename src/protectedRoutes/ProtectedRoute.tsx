import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import IProtectedRouteProps from '../interfaces/IProtectedRouteProps';

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const googleToken = localStorage.getItem('google_token');
  const facebookToken = localStorage.getItem('facebook_token');
  const githubToken = localStorage.getItem('github_token');
  const xToken = localStorage.getItem('x_token');

  if (!googleToken && !facebookToken && !githubToken && !xToken) {
    return <Navigate to='/login' />;
  } 
  
  return children;
};

export default ProtectedRoute;
