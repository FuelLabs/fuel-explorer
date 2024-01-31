import { useFuelTheme } from '@fuel-ui/react';

export function useTheme() {
  const { current, setTheme } = useFuelTheme();

  function toggle() {
    setTheme(current === 'light' ? 'dark' : 'light');
  }

  return {
    handlers: {
      toggle,
    },
    theme: current as 'light' | 'dark',
  };
}
