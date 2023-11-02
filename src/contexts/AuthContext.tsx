import React from "react";
import { useCookies } from "react-cookie";
import { api } from "../lib/api";
import { redirect } from "react-router-dom";

type User = {
  username: string;
};

type AuthContextData = {
  signIn: ({
    token,
    username,
    role,
  }: {
    token: string;
    username: string;
    role: "admin" | "client" | "technician";
  }) => Promise<void>;
  signOut: () => void;
  user: User | null;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = React.createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = React.useState<User | null>(null);
  const isAuthenticated = !!user;
  const { "1": setCookie, "2": removeCookie } = useCookies([
    "helpdelphi_api_token",
  ]);

  async function signIn({
    token,
    username,
    role,
  }: {
    token: string;
    username: string;
    role: "admin" | "client" | "technician";
  }) {
    if (role === "client") {
      throw new Error("Cliente, acesse pelo aplicativo móvel");
    }
    setCookie("helpdelphi_api_token", token, {
      maxAge: 60 * 60 * 24, // 1 Day
      path: "/",
    });

    setUser({
      username,
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    redirect("/app");
  }

  async function signOut() {
    removeCookie("helpdelphi_api_token");
    setUser(null);

    redirect("/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
