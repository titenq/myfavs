/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';

const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const EmailVerified = lazy(() => import('./pages/EmailVerified'));
const NotFound = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <Login />
          </Suspense>
        ) 
      },
      {
        path: '/email-verificado',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <EmailVerified />
          </Suspense>
        ) 
      },
      {
        path: '/admin',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;
