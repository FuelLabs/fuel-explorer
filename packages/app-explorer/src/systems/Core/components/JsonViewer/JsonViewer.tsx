import type { BaseProps } from '@fuels/ui';
import { cx, useTheme } from '@fuels/ui';
import {
  JsonView,
  collapseAllNested,
  darkStyles,
  defaultStyles,
} from 'react-json-view-lite';
import { tv } from 'tailwind-variants';

export type JsonViewerProps = BaseProps<{
  data: object | unknown[];
}>;

export function JsonViewer({ data, className, ...props }: JsonViewerProps) {
  const classes = styles();
  const { theme } = useTheme();
  return (
    <JsonView
      data={data}
      shouldExpandNode={collapseAllNested}
      style={
        {
          ...(theme === 'dark' ? darkStyles : defaultStyles),
          container: cx(classes.json(), className),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
