'use client';
import {
  Box,
  Button,
  Card,
  LoadingBox,
  LoadingWrapper,
  ScrollArea,
  Text,
} from '@fuels/ui';
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
  isLoading?: boolean;
};

export function CodeBlock({
  value,
  type = 'raw',
  title,
  isLoading,
}: CodeBlockProps) {
  const [compact, setCompact] = useState(true);

  const classes = styles();
  if (!value && !isLoading) return null;

  const copyValue = typeof value === 'object' ? JSON.stringify(value, null, 2) : value;

  const content = () => {
    if (type === 'json') {
      try {
        return <JsonViewer data={typeof value === 'object' ? value : JSON.parse(value)} />;
      } catch (e) {
        return <Text className="text-red-500">Error parsing JSON</Text>;
      }
    }
    return <Text className={classes.codeText()}>{value?.toString() || ''}</Text>;
  };

  return (
    <Card className={classes.root()} data-compact={compact}>
      <Card.Header className={classes.cardHeader()}>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-24 h-5" />}
          regularEl={
            <>
              <Text size="1" weight="bold">
                {title || (type === 'json' ? 'JSON' : 'Code')}
              </Text>
              <CopyButton size="1" value={copyValue} />
            </>
          }
        />
      </Card.Header>
      <ScrollArea className={classes.cardMiddle()}>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={
            <Box className="p-4">
              <LoadingBox className="w-full h-24" />
            </Box>
          }
          regularEl={content()}
        />
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
      'transition-[max-height] max-h-[65vh]',
      'data-[compact=true]:max-h-[210px]',
    ],
    cardHeader:
      'border-b border-card-border py-3 flex-row items-center justify-between',
    cardMiddle: [
      'flex-1 font-mono',
      '[&_.rt-ScrollAreaViewport_>div>div]:max-w-[1120px]', // avoid horizontal scroll for JSON
    ],
    codeText: 'text-sm text-gray-500 p-4 max-w-full break-all block',
    cardFooter: [
      'border-t border-card-border',
      'py-3 self-stretch flex-none justify-center',
      'group-data-[compact=true]:[&_svg]:-rotate-180 [&_svg]:transition-transform',
    ],
  },
});
