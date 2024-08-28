'use client';
import {
  Box,
  Card,
  LoadingBox,
  LoadingWrapper,
  ScrollArea,
  Text,
} from '@fuels/ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import CopyButton from '../CopyButton/CopyButton';
import { JsonViewer } from '../JsonViewer';

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
  const classes = styles();
  if (!value && !isLoading) return null;

  function getCopyValue() {
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return value;
  }

  function getTitle() {
    if (title !== undefined) return title;
    if (type === 'json') return 'JSON';
    return 'Code';
  }

  return (
    <Card className={classes.root()}>
      <Card.Header className={classes.cardHeader()}>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-24 h-5" />}
          regularEl={
            <>
              <Text size="3" weight="bold">
                {getTitle()}
              </Text>
              <CopyButton size="1" value={getCopyValue()} />
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
          regularEl={
            <>
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
            </>
          }
        />
      </ScrollArea>
    </Card>
  );
}

const styles = tv({
  slots: {
    root: [
      'group pt-3 px-5 pb-5 gap-0',
      'transition-[max-height] max-h-[85vh]',
    ],
    cardHeader:
      'border-b border-card-border py-3 flex-row items-center justify-between',
    cardMiddle: [
      'flex-1 font-mono dark:bg-black bg-gray-2 rounded',
      '[&_.rt-ScrollAreaViewport_>div>div]:max-w-[1120px]',
    ],
    codeText: 'text-sm text-gray-500 p-4 max-w-full break-all block',
  },
});
