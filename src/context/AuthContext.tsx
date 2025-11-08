"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { services } from "@/lib/services";
import { API } from "@/lib/api";

interface User {
  npm: string;
  nama_lengkap: string;
  email: string;
  fakultas: string;
  jurusan: string;
}

interface AuthContextType {
  user: User | null;
  token: string;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [user, setUser] = useState(null);
  

  const getUserSession = () => {
    const session = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");
    setToken(session);
    setUser(JSON.parse(userData));
  };

  useEffect(() => {
    getUserSession();
  }, []);


  const login = (token: string, user: User) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_data", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
