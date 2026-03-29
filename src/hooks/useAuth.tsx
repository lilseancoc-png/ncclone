"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const USERS_KEY = "neetcode-users";
const SESSION_KEY = "neetcode-session";

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface AuthContextType {
  user: User | null;
  mounted: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (email: string, displayName: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  mounted: false,
  login: () => ({ success: false }),
  register: () => ({ success: false }),
  logout: () => {},
});

// Simple hash for demo purposes (not cryptographically secure — for a production
// app you would use a proper backend with bcrypt)
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(36);
}

function getStoredUsers(): StoredUser[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        const parsed = JSON.parse(session) as User;
        setUser(parsed);
      }
    } catch {}
    setMounted(true);
  }, []);

  const login = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const users = getStoredUsers();
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!found) {
        return { success: false, error: "No account found with that email" };
      }
      if (found.passwordHash !== simpleHash(password)) {
        return { success: false, error: "Incorrect password" };
      }
      const sessionUser: User = {
        id: found.id,
        email: found.email,
        displayName: found.displayName,
        createdAt: found.createdAt,
      };
      setUser(sessionUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      return { success: true };
    },
    []
  );

  const register = useCallback(
    (
      email: string,
      displayName: string,
      password: string
    ): { success: boolean; error?: string } => {
      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters" };
      }
      const users = getStoredUsers();
      const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { success: false, error: "An account with that email already exists" };
      }
      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        email: email.toLowerCase(),
        displayName,
        passwordHash: simpleHash(password),
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      saveStoredUsers(users);

      const sessionUser: User = {
        id: newUser.id,
        email: newUser.email,
        displayName: newUser.displayName,
        createdAt: newUser.createdAt,
      };
      setUser(sessionUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, mounted, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
