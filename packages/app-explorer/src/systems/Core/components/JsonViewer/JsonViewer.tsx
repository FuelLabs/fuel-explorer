import type { BaseProps } from '@fuels/ui';
import { cx } from '@fuels/ui';
import {
  JsonView,
  collapseAllNested,
  defaultStyles,
} from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { tv } from 'tailwind-variants';

export type JsonViewerProps = BaseProps<{
  data: object | unknown[];
  shouldExpandNode?: (level: number, value: unknown, field?: string) => boolean;
}>;

// The library keeps its structure classes. Colours come from fuel tokens, so
// one style set reads in both themes. `!` beats the library's own colour rules.
const cls = {
  label: '!font-medium !text-[var(--fuel-element-high-em)]',
  string: '!text-[var(--fuel-brand-text)]',
  value: '!text-[var(--fuel-element-mid-em)]',
  quiet: '!text-[var(--fuel-element-low-em)]',
};

export function JsonViewer({
  data,
  className,
  shouldExpandNode = collapseAllNested,
  ...props
}: JsonViewerProps) {
  const classes = styles();
  const style = {
    ...defaultStyles,
    container: cx(defaultStyles.container, classes.json(), className),
    label: cx(defaultStyles.label, cls.label),
    clickableLabel: cx(defaultStyles.clickableLabel, cls.label),
    stringValue: cx(defaultStyles.stringValue, cls.string),
    numberValue: cx(defaultStyles.numberValue, cls.value),
    booleanValue: cx(defaultStyles.booleanValue, cls.value),
    otherValue: cx(defaultStyles.otherValue, cls.value),
    nullValue: cx(defaultStyles.nullValue, cls.quiet),
    undefinedValue: cx(defaultStyles.undefinedValue, cls.quiet),
    punctuation: cx(defaultStyles.punctuation, cls.quiet),
    expandIcon: cx(defaultStyles.expandIcon, cls.quiet),
    collapseIcon: cx(defaultStyles.collapseIcon, cls.quiet),
    collapsedContent: cx(defaultStyles.collapsedContent, cls.quiet),
  };

  return (
    <JsonView
      data={data}
      shouldExpandNode={shouldExpandNode}
      style={style as any}
      {...props}
    />
  );
}

const styles = tv({
  slots: {
    json: '!bg-transparent font-mono text-sm py-2 px-1 break-all',
  },
});
