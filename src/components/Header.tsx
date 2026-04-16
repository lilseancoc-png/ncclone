"use client";

import { useState, useRef, useEffect } from "react";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { getTotalProblems } from "@/lib/utils";
import { categories } from "@/data/problems";
import ProgressBar from "./ProgressBar";
import AuthModal from "./auth/AuthModal";

export default function Header() {
  const { completedCount, mounted } = useProgress();
  const { user, mounted: authMounted, logout } = useAuth();
  const total = getTotalProblems(categories);

  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [dropdownOpen]);

  return (
    <>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Neetcode 150</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress */}
            <div className="flex items-center gap-3">
              {mounted ? (
                <span className="text-sm text-gray-400">
                  {completedCount} / {total}
                </span>
              ) : (
                <span className="inline-block w-12 h-4 bg-gray-700 rounded animate-pulse" />
              )}
              <div className="w-32 hidden sm:block">
                <ProgressBar
                  completed={mounted ? completedCount : 0}
                  total={total}
                />
              </div>
            </div>

            {/* Auth */}
            {authMounted && (
              <>
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                        {user.displayName.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-300 hidden sm:inline max-w-[100px] truncate">
                        {user.displayName}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium text-white truncate">
                            {user.displayName}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1.5">
                          <button
                            onClick={() => {
                              logout();
                              setDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                              <polyline points="16 17 21 12 16 7" />
                              <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Log Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAuthModal("login")}
                      className="px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => setAuthModal("register")}
                      className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitchMode={() =>
            setAuthModal((m) => (m === "login" ? "register" : "login"))
          }
        />
      )}
    </>
  );
}
