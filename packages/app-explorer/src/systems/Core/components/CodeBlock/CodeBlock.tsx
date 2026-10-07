import { Box, HStack, LoadingBox, LoadingWrapper, ScrollArea } from '@fuels/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    return t('core.code_block.code');
  }

  return (
    <div className={classes.root()}>
      <div className={classes.cardHeader()}>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-24 h-5" />}
          regularEl={
            <>
              <span className="fuel-label">{getTitle()}</span>
              {Boolean(rightEl || copy) && (
                <HStack align="center">
                  {rightEl}
                  {copy && <CopyButton size="1" value={getCopyValue()} />}
                </HStack>
              )}
            </>
          }
        />
      </div>
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
                <div className={classes.codeText()}>
                  {typeof value === 'object' ? value.toString() : value}
                </div>
              )}
              {children && <div className={classes.codeText()}>{children}</div>}
            </>
          }
        />
      </ScrollArea>
    </div>
  );
}

const styles = tv({
  slots: {
    root: [
      'fuel-edge fuel-appear group block border border-[var(--fuel-line)] bg-[var(--fuel-background)] p-0',
      'transition-[max-height]',
      'data-[compact=true]:max-h-[210px]',
    ],
    cardHeader:
      'flex min-h-[53px] flex-row items-center justify-between border-b border-[var(--fuel-line)] px-4 py-2',
    cardMiddle: [
      'flex-1 font-mono',
      '[&_.rt-ScrollAreaViewport_>div>div]:max-w-[1120px]', // avoid horizontal screen for JSON
    ],
    codeText:
      'block max-w-full break-all p-4 text-[13px] leading-[20px] text-[var(--fuel-element-low-em)]',
  },
});
