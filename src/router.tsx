/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import ProtectedRoute from '@/protectedRoutes/ProtectedRoute';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Admin = lazy(() => import('@/pages/Admin'));
const EmailVerified = lazy(() => import('@/pages/EmailVerified'));
const EmailVerifiedOk = lazy(() => import('@/pages/EmailVerifiedOk'));
const RegisteredSuccessfully = lazy(() => import('@/pages/RegisteredSuccessfully'));
const ResendLink = lazy(() => import('@/pages/ResendLink'));
const NotFound = lazy(() => import('@/pages/NotFound'));

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
        path: '/cadastro',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <Register />
          </Suspense>
        ) 
      },
      {
        path: '/verificar-email',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <EmailVerified />
          </Suspense>
        ) 
      },
      {
        path: '/verificar-email-ok',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <EmailVerifiedOk />
          </Suspense>
        ) 
      },
      {
        path: '/cadastro-sucesso',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <RegisteredSuccessfully />
          </Suspense>
        ) 
      },
      {
        path: '/reenviar-link',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <ResendLink />
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
