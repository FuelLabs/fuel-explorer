import { Theme, Toaster, getStorageTheme } from '@fuels/ui';
import '@fuels/ui/styles.css';

export function FuelsUiProvider({ children }: { children: React.ReactNode }) {
  const defaultTheme = getStorageTheme();

  return (
    <Theme appearance={defaultTheme} hasBackground={false}>
      {children}
      <Toaster />
    </Theme>
  );
}
