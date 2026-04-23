import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  email: string | null;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  socialLogin: (provider: "google" | "apple") => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_EMAIL = "demo@brewtime.app";
const DEMO_PASSWORD = "brew123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ isLoggedIn: false, email: null });

  const login = useCallback(async (email: string, password: string) => {
    const trimmed = email.trim();
    if (!trimmed || !password) {
      return { ok: false, error: "Preencha e-mail e senha." };
    }
    if (trimmed === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setState({ isLoggedIn: true, email: trimmed });
      return { ok: true };
    }
    return { ok: false, error: "Credenciais inválidas. Use demo@brewtime.app / brew123" };
  }, []);

  const logout = useCallback(() => {
    setState({ isLoggedIn: false, email: null });
  }, []);

  const socialLogin = useCallback(async (provider: "google" | "apple") => {
    setState({
      isLoggedIn: true,
      email: provider === "google" ? "social.google@brewtime.app" : "social.apple@brewtime.app",
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      socialLogin,
    }),
    [state, login, logout, socialLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside AuthProvider");
  return ctx;
}
