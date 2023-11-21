import { GroupedOutputType } from '@fuel-explorer/graphql';
import type { ChangeOutput, GroupedOutput } from '@fuel-explorer/graphql';
import type { CollapsibleProps } from '@fuels/ui';
import {
  Address,
  Card,
  HStack,
  Text,
  VStack,
  createComponent,
  cx,
  useBreakpoints,
  Collapsible,
  Icon,
} from '@fuels/ui';
import { IconCircleMinus, IconCoins } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { tv } from 'tailwind-variants';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { useFuelAsset } from '~/systems/Asset/hooks/useFuelAsset';
import { formatZeroUnits } from '~/systems/Core/utils/format';

import { TxIcon } from '../TxIcon/TxIcon';

export type TxOutputProps = CollapsibleProps & {
  output: GroupedOutput;
};

const COIN_OUTPUT_LABEL = {
  CoinOutput: (
    <>
      <Icon icon={IconCircleMinus} size={12} className="mr-2 text-muted" />
      Spent
    </>
  ),
  ChangeOutput: (
    <>
      <Icon icon={IconCoins} size={12} className="mr-2 text-muted" />
      Final Balance
    </>
  ),
};

const TxOutputCoin = createComponent<TxOutputProps, typeof Collapsible>({
  id: 'TxOutputCoin',
  render: (_, { output, ...props }) => {
    const { isMobile } = useBreakpoints();

    if (!output.assetId) return null;
    const assetId = output.assetId;
    const changeOutput = output.outputs?.find(
      (i) => i?.__typename === 'ChangeOutput',
    );
    const amount = (changeOutput as ChangeOutput)?.amount ?? bn(0);
    const asset = useAsset(assetId);
    const fuelAsset = useFuelAsset(asset);
    if (!asset) return null;

    return (
      <Collapsible {...props} className={cx('py-3', props.className)}>
        <Collapsible.Header>
          <AssetItem assetId={assetId} className="flex-1">
            <Address
              prefix="To:"
              value={output.to || ''}
              linkProps={{
                as: NextLink,
                href: `/account/${output.to}/assets`,
              }}
            />
          </AssetItem>
          {/*
            I'm just hidding this until we get the output/input design merged 
            https://linear.app/fuel-network/issue/FE-18/change-inputs-and-outputs-component-for-better-relevance
          */}
          <HStack align="center" className="hidden tablet:block">
            {amount && (
              <Text className="text-secondary">
                {fuelAsset?.decimals ? (
                  <>
                    {bn(amount).format({
                      precision: isMobile ? 3 : undefined,
                      units: fuelAsset.decimals,
                    })}{' '}
                  </>
                ) : (
                  formatZeroUnits(amount)
                )}
                {asset.symbol}
              </Text>
            )}
          </HStack>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Amounts</Collapsible.Title>
          <Collapsible.Body className="text-xs leading-normal flex flex-col gap-2">
            {output.outputs?.map((output) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const amount = (output as any)?.amount;
              const typename = output?.__typename as string;
              return (
                <HStack key={typename} className="justify-between">
                  <span>{COIN_OUTPUT_LABEL[typename]}</span>
                  <span className="text-secondary">
                    {fuelAsset?.decimals ? (
                      <>
                        {bn(amount).format({
                          precision: isMobile ? 3 : undefined,
                          units: fuelAsset.decimals,
                        })}{' '}
                      </>
                    ) : (
                      formatZeroUnits(amount)
                    )}
                    {asset.symbol}
                  </span>
                </HStack>
              );
            })}
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});

const TxOutputContractCreated = createComponent<TxOutputProps, typeof Card>({
  id: 'TxOutputContractCreated',
  render: (_, { output, ...props }) => {
    const contractId = output.contract?.id as string;

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header>
          <HStack align="center">
            <TxIcon status="Success" type="Contract" />
            <VStack gap="1">
              <Text className="font-medium">Contract Created</Text>
              <Address
                prefix="Id:"
                value={contractId}
                linkProps={{
                  as: NextLink,
                  href: `/contract/${contractId}/assets`,
                }}
              />
            </VStack>
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

const TxOutputMessage = createComponent<TxOutputProps, typeof Card>({
  id: 'TxOutputMessage',
  render: (_, { output, ...props }) => {
    const classes = styles();
    const { recipient } = output;

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <TxIcon type="Message" status="Submitted" />
          <HStack className="gap-1 flex-col tablet:flex-row tablet:items-center tablet:flex-1">
            <Text className="hidden tablet:block">Message</Text>
            <VStack className="gap-1 tablet:flex-1 tablet:items-end">
              <Address
                prefix="From: "
                value={recipient || ''}
                linkProps={{
                  as: NextLink,
                  href: `/account/${recipient}/assets`,
                }}
              />
              <Address
                prefix="To: "
                value={output.to || ''}
                linkProps={{
                  as: NextLink,
                  href: `/account/${output.to}/assets`,
                }}
              />
            </VStack>
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

export function TxOutput({ output, ...props }: TxOutputProps) {
  if (
    output.type === GroupedOutputType.CoinOutput ||
    output.type === GroupedOutputType.ChangeOutput
  ) {
    return <TxOutputCoin output={output} {...props} />;
  }
  if (output.type === GroupedOutputType.ContractCreated) {
    return <TxOutputContractCreated output={output} {...props} />;
  }
  if (output.type === GroupedOutputType.MessageOutput) {
    return <TxOutputMessage output={output} {...props} />;
  }
}

const styles = tv({
  slots: {
    header: 'group flex flex-row gap-4 justify-between items-center',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-2 mx-4 py-3 px-4 rounded',
  },
});
