'use client';
import { Button, Card, ScrollArea, Text } from '@fuels/ui';
import { IconChevronUp } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

import CopyButton from '../CopyButton/CopyButton';
import { JsonViewer } from '../JsonViewer/JsonViewer';

export type CodeBlockProps = {
  value: string | object;
  type?: 'json' | 'raw' | string;
  title?: ReactNode;
};

export function CodeBlock({ value, type = 'raw', title }: CodeBlockProps) {
  const [compact, setCompact] = useState<boolean>(true);

  const classes = styles();
  if (!value) return null;

  function getCopyValue() {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return value;
  }

  function getTitle() {
    if (title != undefined) return title;
    if (type === 'json') return 'JSON';
    return 'Code';
  }

  return (
    <Card className={classes.root()} data-compact={compact}>
      <Card.Header className={classes.cardHeader()}>
        <Text size="1" weight="bold">
          {getTitle()}
        </Text>
        <CopyButton size="1" value={getCopyValue()} />
      </Card.Header>
      <ScrollArea className={classes.cardMiddle()} scrollbars="vertical">
        {type === 'json' && (
          <JsonViewer
            data={typeof value === 'object' ? value : JSON.parse(value)}
          />
        )}
        {type === 'raw' && (
          <Text className={classes.codeText()}>
            {typeof value === 'object' ? value.toString() : value}
          </Text>
        )}
      </ScrollArea>
      <Card.Footer className={classes.cardFooter()}>
        <Button
          variant="link"
          size="1"
          color="gray"
          rightIcon={IconChevronUp}
          onClick={() => setCompact(!compact)}
        >
          Show {compact ? 'more' : 'less'}
        </Button>
      </Card.Footer>
    </Card>
  );
}

const styles = tv({
  slots: {
    root: [
      'group p-0 gap-0',
      'transition-[max-height] max-h-[75vh]',
      'data-[compact=true]:max-h-[200px]',
    ],
    cardHeader:
      'border-b border-card-border py-3 flex-row items-center justify-between',
    cardMiddle: [
      'flex-1',
      '[&_.rt-ScrollAreaViewport_>div>div]:max-w-[1120px]', // avoid horizontal screen for JSON
    ],
    codeText: 'text-sm text-gray-500 p-4 max-w-full break-all block',
    cardFooter: [
      'border-t border-card-border',
      'py-3 self-stretch flex-none justify-center',
      'group-data-[compact=true]:[&_svg]:-rotate-180 [&_svg]:transition-transform',
    ],
  },
});
