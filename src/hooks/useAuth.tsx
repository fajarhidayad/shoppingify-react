import { ReactNode, createContext, useContext, useState } from 'react';

interface UserInfo {
  userId: number;
  email: string;
  name: string;
}

export interface AuthContextProps {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (data: UserInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo | null>(
    localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')!)
      : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) return true;
    return false;
  });

  function login(data: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error('useAuth must be used within an AuthProvider');

  return auth;
};
