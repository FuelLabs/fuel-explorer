import { useTheme } from 'next-themes';
import { useEffect } from 'react';

/*
  This component ensure the theme is saved
  to storage. Making it available for other applications
  under the same domain
*/
export function ThemeDefault() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === 'system') {
      setTheme('dark');
    }
  }, [theme]);

  return null;
}
