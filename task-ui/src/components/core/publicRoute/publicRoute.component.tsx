import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { JSX } from 'react';
import { Loading } from '@/components';
import { Routes } from '@/models';

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  return !isAuthenticated ? children : <Navigate to={Routes.TASK} replace />;
};
