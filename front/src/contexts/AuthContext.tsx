import jwt_decode from 'jwt-decode';
import { createContext, FC, useEffect, useMemo, useReducer } from 'react';
import api from 'src/services/api';
import { login } from 'src/services/login';
export type AuthContextInterface = {
  state: {
    token: string;
    data: {
      name: string;
      email: string;
      role: string;
    };
    isLoading: boolean;
    isSignOut: boolean;
  };
  authContext: {
    signIn: (email: string, password: string) => void;
    signOut: () => void;
  };
};

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    (
      prevState: any,
      action: {
        token?: string | null | undefined;
        data?: any;
        type: string;
      }
    ) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
            data: action.data,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
            data: action.data,
            isLoading: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            token: null,
            data: null,
            isLoading: false,
          };
        case 'LOADING':
          return {
            ...prevState,
            isLoading: !prevState.isLoading,
          };
      }
    },
    {
      token: null,
      data: null,
      isLoading: true,
      isSignout: false,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const retrieveToken = async () => {
      const tokenString = localStorage.getItem('token');
      const token = JSON.parse(tokenString);
      if (token) {
        const decoded = jwt_decode(token);
        dispatch({ type: 'RESTORE_TOKEN', token: token, data: decoded });
        api.defaults.headers.common['authorization'] = `Bearer ${token}`;
      } else dispatch({ type: 'SIGN_OUT' });
    };

    retrieveToken();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        try {
          const response = await login(email, password);
          if (response.status === 201 && response.access_token) {
            const token = response.access_token;
            localStorage.setItem('token', JSON.stringify(token));
            const decoded = jwt_decode(token);
            dispatch({ type: 'SIGN_IN', token: token, data: decoded });
            api.defaults.headers.common['authorization'] = `Bearer ${token}`;
          }
        } catch (error) {
          throw new Error(error);
        }
      },
      signOut: () => {
        localStorage.removeItem('token');
        dispatch({ type: 'SIGN_OUT' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ state, authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
