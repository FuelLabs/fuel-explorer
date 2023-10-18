import type { BaseProps } from '@fuels/ui';
import {
  Badge,
  Card,
  Code,
  HStack,
  IconButton,
  Text,
  VStack,
  useRadixTheme,
} from '@fuels/ui';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { bn } from 'fuels';
import type { OperationFunctionCall } from 'fuels';
import Image from 'next/image';
import { useState } from 'react';
import {
  JsonView,
  allExpanded,
  defaultStyles,
  darkStyles,
} from 'react-json-view-lite';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import 'react-json-view-lite/dist/index.css';

import { TxIcon } from '../TxIcon/TxIcon';

const ICON_SIZE = 24;

export type TxScriptRowProps = {
  item: OperationFunctionCall;
};

export function TxScriptRow({ item }: TxScriptRowProps) {
  const [opened, setOpened] = useState(false);
  const asset = useAsset(item.assetId);
  const classes = styles();
  const ctx = useRadixTheme();

  return (
    <Card className="py-0 gap-0">
      <Card.Header
        className="group p-3"
        data-state={opened ? 'opened' : 'closed'}
      >
        <HStack align="center">
          <Badge color="gray" size="2">
            Call
          </Badge>
          <Code className="flex-1 bg-transparent text-muted" color="gray">
            {item.functionName}()
          </Code>
          <Text as="p" className="flex items-center gap-2">
            {asset?.icon ? (
              <Image
                src={asset.icon as string}
                width={ICON_SIZE}
                height={ICON_SIZE}
                alt={asset.name}
              />
            ) : (
              <TxIcon type="Mint" status="Submitted" />
            )}
            <Text>
              {bn(item.amount).format()} {asset?.symbol ?? ''}
            </Text>
          </Text>
          <IconButton
            iconColor="text-muted"
            variant="link"
            className={classes.icon()}
            icon={opened ? IconChevronUp : IconChevronDown}
            onClick={() => setOpened(!opened)}
          />
        </HStack>
      </Card.Header>
      {opened && item.argumentsProvided && (
        <Card.Body className={classes.utxos()}>
          <JsonView
            data={item.argumentsProvided}
            shouldExpandNode={allExpanded}
            style={{
              ...(ctx.appearance === 'dark' ? darkStyles : defaultStyles),
              container: classes.json(),
            }}
          />
        </Card.Body>
      )}
    </Card>
  );
}

export type TxScriptsProps = BaseProps<{
  calls: OperationFunctionCall[];
}>;

export function TxScript({ calls, ...props }: TxScriptsProps) {
  return (
    <VStack {...props}>
      {calls.map((call) => (
        <TxScriptRow
          key={call.assetId + call.functionName + call.functionSignature}
          item={call}
        />
      ))}
    </VStack>
  );
}

const styles = tv({
  slots: {
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-3 mx-3 mb-3 p-0 rounded',
    json: 'bg-transparent text-sm py-2 px-1',
  },
});
