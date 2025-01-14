import { useAuth } from '@src/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function Private() {
  const { isLogged } = useAuth();
  return isLogged ? <Outlet /> : <Navigate to="/" />;
}
