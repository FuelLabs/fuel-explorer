import {
  Box,
  Card,
  HStack,
  LoadingBox,
  LoadingWrapper,
  ScrollArea,
  Text,
} from '@fuels/ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import CopyButton from '../CopyButton/CopyButton';
import { JsonViewer } from '../JsonViewer/JsonViewer';

export type CodeBlockProps = {
  title?: ReactNode;
  isLoading?: boolean;
  value?: string | object;
  children?: ReactNode;
  rightEl?: ReactNode;
  height?: number | 'auto';
  type?: 'json' | 'raw' | string;
  copy?: boolean;
};

export function CodeBlock({
  value = '',
  type = 'raw',
  title,
  children,
  rightEl,
  height = 'auto',
  isLoading,
  copy = true,
}: CodeBlockProps) {
  const classes = styles();
  if (!value && !children && !isLoading) return null;

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
              <Text size="1" weight="bold">
                {getTitle()}
              </Text>
              {Boolean(rightEl || copy) && (
                <HStack align="center">
                  {rightEl}
                  {copy && <CopyButton size="1" value={getCopyValue()} />}
                </HStack>
              )}
            </>
          }
        />
      </Card.Header>
      <ScrollArea className={classes.cardMiddle()} style={{ height }}>
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
              {children && <div className={classes.codeText()}>{children}</div>}
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
      'block',
      'group p-0',
      'transition-[max-height]',
      'data-[compact=true]:max-h-[210px]',
    ],
    cardHeader:
      'border-b border-card-border py-3 flex-row items-center justify-between min-h-[53px]',
    cardMiddle: [
      'flex-1 font-mono',
      '[&_.rt-ScrollAreaViewport_>div>div]:max-w-[1120px]', // avoid horizontal screen for JSON
    ],
    codeText: 'text-sm text-gray-500 p-4 max-w-full break-all block',
  },
});
