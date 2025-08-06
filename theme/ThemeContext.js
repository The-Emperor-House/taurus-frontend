'use client';

import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

export const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (systemPref ? 'dark' : 'light');

    setMode(initial);
    setMounted(true);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleMode = useCallback(() => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, [mode]);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return mounted ? (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  ) : null;
}