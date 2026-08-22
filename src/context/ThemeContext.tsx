import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'theme';
const VALID_THEMES: readonly string[] = ['dark', 'light'];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme !== null && VALID_THEMES.includes(savedTheme)) {
      return savedTheme as Theme;
    }
  } catch {
    // Storage unavailable (e.g. privacy mode) — fall through to system preference.
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
};

const persistTheme = (theme: Theme): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable — theme still applies for this session.
  }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Single-page CSR app: lazy initializer is safe and avoids a
  // setState-in-effect cascade plus a context-less first render.
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Standard context pattern: the provider component and its consumer hook
// live together by convention. The react-refresh rule targets mixed module
// exports for HMR boundaries; this is an intentional, idiomatic exception.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
