import '@fuels/ui/styles.css';
import { Theme, Toaster, getStorageTheme } from '@fuels/ui';

export function FuelsUiProvider({ children }: { children: React.ReactNode }) {
  const defaultTheme = getStorageTheme();

  return (
    <Theme appearance={defaultTheme} hasBackground={false}>
      {children}
      <Toaster />
    </Theme>
  );
}
