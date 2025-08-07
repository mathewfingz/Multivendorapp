import { useEffect, useState } from 'react';

export type Theme = 'pixel-verse' | 'curry-landing' | 'nova-haven' | 'nova-works';

export function useTheme(defaultTheme: Theme = 'pixel-verse') {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('theme')) as Theme | null;
    setTheme(saved ?? defaultTheme);
  }, [defaultTheme]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return { theme, setTheme };
}
