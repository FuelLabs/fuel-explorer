'use client';
import type { BaseProps } from '@fuels/ui';
import { cx } from '@fuels/ui';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  JsonView,
  collapseAllNested,
  darkStyles,
  defaultStyles,
} from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { tv } from 'tailwind-variants';

export type JsonViewerProps = BaseProps<{
  data: object | unknown[];
}>;

export function JsonViewer({ data, className, ...props }: JsonViewerProps) {
  const classes = styles();
  const [style, setStyle] = useState(defaultStyles);
  const { theme } = useTheme();

  // TODO: theme is loaded as dark but doesn't render in JsonView correctly
  // using this solution we force the state to change
  // and rerender the component
  useEffect(() => {
    const newStyle = theme === 'dark' ? darkStyles : defaultStyles;
    setStyle(newStyle);
  }, [theme]);

  return (
    <JsonView
      data={data}
      shouldExpandNode={collapseAllNested}
      style={
        {
          ...style,
          container: cx(classes.json(), className),
        } as any
      }
      {...props}
    />
  );
}

const styles = tv({
  slots: {
    json: 'dark:bg-black bg-gray-2 text-sm py-2 px-1 break-all rounded-lg',
  },
});
