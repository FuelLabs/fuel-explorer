import { FORCE_RE_RENDER } from '@storybook/core-events';
import { addons } from '@storybook/manager-api';
import React, { useEffect } from 'react';

export const withThemeDecorator =
  (Wrapper: React.ComponentType<any>) => (Story: any) => {
    const theme = window.localStorage.getItem('fuel-ui-theme');

    useEffect(() => {
      const isDark = theme === 'dark';
      if (isDark) {
        document.documentElement.setAttribute('style', 'color-scheme: dark;');
        document.documentElement.classList.add('dark-theme');
        document.documentElement.classList.remove('light-theme');
      } else {
        document.documentElement.setAttribute('style', 'color-scheme: light;');
        document.documentElement.classList.add('light-theme');
        document.documentElement.classList.remove('dark-theme');
      }
      addons.getChannel().emit(FORCE_RE_RENDER);
    }, [theme]);

    return (
      <Wrapper>
        <Story />
      </Wrapper>
    );
  };
