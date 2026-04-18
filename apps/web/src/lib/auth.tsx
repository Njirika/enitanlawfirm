import { createContext, useContext, ReactNode } from "react";
import { useGetAdminMe } from "@workspace/api-client-react";

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAdmin: false, isLoading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: admin, isLoading } = useGetAdminMe();

  return (
    <AuthContext.Provider value={{ isAdmin: !!admin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
