import type { BaseProps } from '@fuels/ui';
import { cx } from '@fuels/ui';
import { useEffect, useState } from 'react';
import {
  JsonView,
  collapseAllNested,
  darkStyles,
  defaultStyles,
} from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { tv } from 'tailwind-variants';
import { useTheme } from '../Theme/ThemeProvider';

export type JsonViewerProps = BaseProps<{
  data: object | unknown[];
}>;

export function JsonViewer({ data, className, ...props }: JsonViewerProps) {
  const classes = styles();
  const [style, setStyle] = useState(defaultStyles);
  const { resolvedTheme } = useTheme();

  // Update styles when theme changes
  useEffect(() => {
    setStyle(resolvedTheme === 'dark' ? darkStyles : defaultStyles);
  }, [resolvedTheme]);

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
    json: 'bg-transparent text-sm py-2 px-1 break-all',
  },
});
