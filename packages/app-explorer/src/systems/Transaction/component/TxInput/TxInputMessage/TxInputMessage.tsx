import {
  Address,
  Badge,
  Box,
  Collapsible,
  Flex,
  HStack,
  Hex32,
  Text,
  VStack,
  createComponent,
} from '@fuels/ui';
import { findAssetBySymbol } from 'app-commons';
import { bn } from 'fuels';

import { Routes } from '~/routes';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';
import { getAssetFuelCurrentChain } from '~portal/systems/Assets/utils/network';
import { styles } from '../TxInputContract/styles';
import type { TxInputMessageProps } from './types';

export const TxInputMessage = createComponent<
  TxInputMessageProps,
  typeof Collapsible
>({
  id: 'TxInputMessage',
  render: (_, { input, ...props }) => {
    const { sender, recipient, data, nonce } = input;
    const amount = input.amount;
    if (!sender || !recipient) return null;
    const classes = styles();
    const ethAsset = findAssetBySymbol('ETH');
    let decimals = '';
    if (ethAsset) {
      const currentChain = getAssetFuelCurrentChain(ethAsset);
      decimals = `${currentChain.decimals}`;
    }
    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          <Flex className="flex flex-col items-center tablet:flex-row gap-2 w-full">
            <Badge
              color="gray"
              className="font-mono ml-14 tablet:ml-0 self-start tablet:self-center justify-center flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              MESSAGE
            </Badge>

            <Flex className="w-full items-start tablet:items-end flex flex-col tablet:flex-row">
              <HStack className="gap-4 tablet:items-center tablet:flex-1 ">
                {Number(amount) > 0 && ethAsset ? (
                  <img
                    src={ethAsset.icon}
                    width={38}
                    height={38}
                    alt={ethAsset.name}
                  />
                ) : (
                  <TxIcon type="Message" status="Submitted" />
                )}
                <Flex className="gap-1 flex-col tablet:flex-row items-center flex-1">
                  <VStack className="gap-1 items-start flex-1">
                    <Address
                      value={sender}
                      prefix="Sender:"
                      linkProps={{
                        href: Routes.accountAssets(sender),
                      }}
                    />
                    <Address
                      value={recipient}
                      prefix="Recipient:"
                      linkProps={{
                        href: Routes.accountAssets(recipient),
                      }}
                      isAccount
                    />
                  </VStack>
                  {!!amount && (
                    <Box className="w-full tablet:w-auto tablet:ml-0 justify-start flex flex-row tablet:block">
                      <Amount
                        className="text-primary text-base"
                        hideIcon
                        hideSymbol
                        value={bn(amount)}
                        decimals={decimals}
                      />
                    </Box>
                  )}
                </Flex>
              </HStack>
            </Flex>
          </Flex>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Data</Collapsible.Title>
          <Collapsible.Body className="p-0">
            <VStack className="p-2 px-4">
              <Hex32
                prefix="Nonce:"
                value={nonce}
                className={classes.contractAddress()}
              />
              <div className="text-xs leading-normal text-wrap break-all">
                <Text className="text-xs text-secondary font-mono">
                  Data: {data}
                </Text>
              </div>
            </VStack>
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});
