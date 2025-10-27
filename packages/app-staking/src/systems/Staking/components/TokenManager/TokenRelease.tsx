import { Flex, HStack, Text, Tooltip, VStack } from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import type { Address } from 'viem';
import { useVesting } from '../../hooks/useVesting';
import {
  type AccountData,
  useSequencerAccount,
} from '../../services/useSequencerAccount';
import { formatTimestamp } from '../../utils/formatTimestamp';

type TokenReleaseProps = {
  account: Address | undefined;
};

const vestingSelector = (data: AccountData) => data.account.vesting_account;
const { symbol: symbolV2 } = TOKENS[FuelToken.V2];

export const TokenRelease = ({ account }: TokenReleaseProps) => {
  const { data: vesting } = useSequencerAccount(account, {
    select: vestingSelector,
  });

  const { vesting_start, vesting_end, vestingTotalBalance } = useVesting({
    account,
  });

  if (!vesting) return null;

  return (
    <VStack gap="2">
      <Text className="font-mono" size="4" weight="bold">
        FUEL Tokens Vesting
      </Text>

      {/* <div className="filter-single-clip-polygon">
          <Card className="p-6 border-single-clip-polygon">
            <Card.Header className="p-0 flex flex-row gap-4 items-center">
              <Card.Title size="2">
                Locked FUEL tokens
                <Tooltip
                  content="This FUEL tokens will be released automatically when the release date approaches. No action is required."
                  delayDuration={0}
                  className="text-center"
                >
                  <IconInfoCircle size={16} />
                </Tooltip>
              </Card.Title>
            </Card.Header>
            <Card.Body className="p-0 flex flex-col md:flex-row md:items-center gap-4">
              <HStack
                gap="4"
                mt={{
                  initial: '2',
                  md: '0',
                }}
              >
                <Tooltip
                  content={`${vestingTokensBalance.original.display} ${v2.symbol}`}
                  delayDuration={0}
                >
                  <Text
                    size="8"
                    weight="bold"
                    className="self-center font-mono"
                    as="span"
                  >
                    {vestingTokensBalance.formatted.display}
                  </Text>
                </Tooltip>
                <BadgeAsset icon="/assets/fuel.png" variant="solid">
                  {v2.symbol}
                </BadgeAsset>
              </HStack>
            </Card.Body>
          </Card>
        </div> */}

      <Flex
        justify="between"
        direction={{
          initial: 'column',
          md: 'row',
        }}
        gap="1"
        className="bg-gray-3 rounded-md px-2 py-1.5 mr-[40px]"
      >
        <HStack gap="2">
          <VStack gap="0">
            <div>
              <Text size="2" weight="medium" className="text-gray-11">
                Total vesting:{' '}
              </Text>
              <Tooltip
                content={`${vestingTotalBalance.original.display} ${symbolV2}`}
                delayDuration={0}
              >
                <Text size="2" weight="medium" className="text-gray-12">
                  <span>{vestingTotalBalance.formatted.display}</span>{' '}
                  {symbolV2}
                </Text>
              </Tooltip>
            </div>
          </VStack>
        </HStack>

        <Flex
          direction={{
            initial: 'column',
            md: 'row',
          }}
          gap={{
            initial: '1',
            md: '2',
          }}
        >
          <span className="hidden md:inline-block text-gray-11">•</span>
          <HStack gap="1" align="center">
            <Text size="2" weight="medium" className="text-gray-11">
              Start date:{' '}
            </Text>
            <Text size="2" weight="medium" className="text-gray-12">
              {formatTimestamp(vesting_start)}
            </Text>
          </HStack>
          <span className="hidden md:inline-block text-gray-11">•</span>
          <HStack gap="1" align="center">
            <Text size="2" weight="medium" className="text-gray-11">
              Release end:{' '}
            </Text>
            <Text size="2" weight="medium" className="text-gray-12">
              {formatTimestamp(vesting_end)}
            </Text>
          </HStack>
        </Flex>
      </Flex>
    </VStack>
  );
};
