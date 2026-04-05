"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export interface User {
  id: string;
  email: string;
  displayName: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  mounted: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, displayName: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  mounted: false,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
});

// ---------------------------------------------------------------------------
// Helpers to convert Supabase user to our User type
// ---------------------------------------------------------------------------
function toUser(su: SupabaseUser): User {
  return {
    id: su.id,
    email: su.email ?? "",
    displayName:
      su.user_metadata?.display_name ??
      su.user_metadata?.full_name ??
      su.email?.split("@")[0] ??
      "User",
  };
}

// ---------------------------------------------------------------------------
// Fallback: localStorage-based auth (when Supabase is not configured)
// ---------------------------------------------------------------------------
const USERS_KEY = "neetcode-users";
const SESSION_KEY = "neetcode-session";

interface StoredUser extends User {
  passwordHash: string;
}

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

function useLocalAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) setUser(JSON.parse(session));
    } catch {}
    setMounted(true);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { success: false, error: "No account found with that email" };
    if (found.passwordHash !== simpleHash(password))
      return { success: false, error: "Incorrect password" };
    const sessionUser: User = { id: found.id, email: found.email, displayName: found.displayName };
    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return { success: true };
  }, []);

  const register = useCallback(
    async (email: string, displayName: string, password: string): Promise<AuthResult> => {
      if (password.length < 6)
        return { success: false, error: "Password must be at least 6 characters" };
      const users = getStoredUsers();
      if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
        return { success: false, error: "An account with that email already exists" };
      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        email: email.toLowerCase(),
        displayName: displayName || email.split("@")[0],
        passwordHash: simpleHash(password),
      };
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      const sessionUser: User = { id: newUser.id, email: newUser.email, displayName: newUser.displayName };
      setUser(sessionUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      return { success: true };
    },
    []
  );

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  return { user, mounted, login, register, logout } as const;
}

// ---------------------------------------------------------------------------
// Supabase auth
// ---------------------------------------------------------------------------
function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) {
      setMounted(true);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? toUser(session.user) : null);
      setMounted(true);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toUser(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, [configured]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("Invalid login"))
          return { success: false, error: "Invalid email or password" };
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch {
      return { success: false, error: "Unable to connect. Please check your internet connection and try again." };
    }
  }, []);

  const register = useCallback(
    async (email: string, displayName: string, password: string): Promise<AuthResult> => {
      if (password.length < 6)
        return { success: false, error: "Password must be at least 6 characters" };
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: displayName || email.split("@")[0] } },
        });
        if (error) {
          if (error.message.includes("already registered"))
            return { success: false, error: "An account with that email already exists" };
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch {
        return { success: false, error: "Unable to connect. Please check your internet connection and try again." };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { user, mounted, login, register, logout } as const;
}

// ---------------------------------------------------------------------------
// Provider — picks Supabase or localStorage automatically
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  const supabaseAuth = useSupabaseAuth();
  const localAuth = useLocalAuth();

  const active = isSupabaseConfigured() ? supabaseAuth : localAuth;

  return (
    <AuthContext.Provider value={active}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
