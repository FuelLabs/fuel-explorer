import { useRadixTheme } from '@fuels/ui';
import {
  JsonView,
  collapseAllNested,
  darkStyles,
  defaultStyles,
} from 'react-json-view-lite';
import { tv } from 'tailwind-variants';

export type JsonViewerProps = {
  data: object | unknown[];
};

export function JsonViewer({ data, ...props }: JsonViewerProps) {
  const classes = styles();
  const ctx = useRadixTheme();
  return (
    <JsonView
      data={data}
      shouldExpandNode={collapseAllNested}
      style={{
        ...(ctx.appearance === 'dark' ? darkStyles : defaultStyles),
        container: classes.json(),
      }}
      {...props}
    />
  );
}

const styles = tv({
  slots: {
    json: 'bg-transparent text-sm py-2 px-1',
  },
});
