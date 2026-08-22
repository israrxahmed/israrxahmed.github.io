import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ThemeContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.document.documentElement.className = '';
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({ matches: false, media: query }),
    });
  });

  afterEach(cleanup);

  it('applies the dark class and reports dark by default', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(window.document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles to light, updates the class and persists the choice', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('toggle'));

    expect(screen.getByTestId('theme').textContent).toBe('light');
    expect(window.document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  it('ignores corrupted stored theme values instead of trusting them', () => {
    window.localStorage.setItem('theme', '<script>alert(1)</script>');
    // Force a fresh module evaluation so the lazy initializer re-reads storage.
    vi.resetModules();

    return import('@/context/ThemeContext').then(
      ({ ThemeProvider: FreshProvider, useTheme: freshUseTheme }) => {
        function FreshProbe() {
          const { theme } = freshUseTheme();
          return <span data-testid="fresh-theme">{theme}</span>;
        }
        render(
          <FreshProvider>
            <FreshProbe />
          </FreshProvider>
        );
        // Falls back to a valid default; arbitrary stored values must not win.
        const shown = screen.getByTestId('fresh-theme').textContent;
        expect(['dark', 'light']).toContain(shown);
        expect(shown).not.toContain('<script>');
      }
    );
  });
});
