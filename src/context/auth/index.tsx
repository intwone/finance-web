import { localStorageEnum } from '@src/enums/localStorageEnum';
import axiosClientApi from '@src/services/clients/axiosClient';
import { useLoginLazyQuery } from '@src/services/graphql/generated/schema';
import { createContext, useCallback, useMemo, useState } from 'react';
import { AuthContextData, AuthProviderProps, SignInCredentials } from './types';

const { TOKEN, USER } = localStorageEnum;
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem(TOKEN);
    const user = localStorage.getItem(USER);

    if (token && user) {
      axiosClientApi.defaults.headers.common.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const [loginQuery] = useLoginLazyQuery();

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      const { data: loginQueryData } = await loginQuery({
        variables: { data: { email, password } },
      });

      const token = loginQueryData?.login?.token as string;
      const user = loginQueryData?.login?.user;

      if (!token && !user) return false;

      localStorage.setItem(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));

      axiosClientApi.defaults.headers.common.Authorization = `Bearer ${token}`;

      setData({ token, user });

      return true;
    },
    [loginQuery],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    setData({});
  }, []);

  const value = useMemo(() => {
    return {
      user: data.user,
      isLogged: !!data.user,
      signIn,
      signOut,
    };
  }, [data, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
