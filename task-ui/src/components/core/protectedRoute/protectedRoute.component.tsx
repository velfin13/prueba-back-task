import { useAuth } from '@/hooks';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { Loading } from '@/components';
import { Routes } from '@/models';

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;
  return isAuthenticated ? children : <Navigate to={Routes.AUTH} replace />;
};
