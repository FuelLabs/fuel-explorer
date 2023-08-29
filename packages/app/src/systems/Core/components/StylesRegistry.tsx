'use client';

import { getCssText } from '@fuel-ui/css';
import {
  darkTheme,
  lightTheme,
  loadIcons,
  setFuelThemes,
} from '@fuel-ui/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

loadIcons('/icons/sprite.svg');
setFuelThemes({
  initial: 'dark',
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
});

export default function StylesRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRendered, setIsRendered] = useState(false);

  useServerInsertedHTML(() => {
    if (!isRendered) {
      setIsRendered(true);

      return (
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      );
    }
  });

  return <>{children}</>;
}
