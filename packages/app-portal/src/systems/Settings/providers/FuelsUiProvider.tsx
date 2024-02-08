import { Theme, ThemesPossible, Toaster, getStorageTheme } from '@fuels/ui';
import '@fuels/ui/styles.css';
import { useEffect, useState } from 'react';

export function FuelsUiProvider({ children }: { children: React.ReactNode }) {
  const currentTheme = getStorageTheme();
  const [theme, setTheme] = useState<ThemesPossible>(currentTheme);

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  return (
    <Theme appearance={theme} hasBackground={false}>
      {children}
      <Toaster />
    </Theme>
  );
}
