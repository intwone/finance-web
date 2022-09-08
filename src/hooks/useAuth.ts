import { AuthContext } from '@src/context/auth';
import { AuthContextData } from '@src/context/auth/types';
import { useContext } from 'react';

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
