import { Box, Button, Dropdown, Flex, Link } from '@fuels/ui';
import { IconChevronDown } from '@tabler/icons-react';
import { FUEL_CHAIN, FUEL_CHAINS, type FuelChain } from 'app-commons';
import clsx from 'clsx';

const NETWORKS = Object.values(FUEL_CHAINS).filter((c) => !c.hidden);
const MAINNET_NETWORKS = NETWORKS.filter((c) => !c.testnet).map((n) => ({
  ...n,
  name: `${n.name} Mainnet`,
}));
const TESTNET_NETWORKS = NETWORKS.filter((c) => c.testnet);

function NetworkItem({
  chain,
  selected,
}: { chain: FuelChain; selected?: boolean }) {
  return (
    <Dropdown.Item
      key={chain.id}
      className={clsx('px-4', {
        'hover:bg-gray-3': !selected,
        'hover:bg-transparent': selected,
      })}
      disabled={selected}
    >
      <Link
        href={selected ? undefined : chain.blockExplorerUrl}
        target="_self"
        isExternal={false}
        externalIcon={null}
        color={selected ? 'green' : 'gray'}
        underline="none"
        className="decoration-none w-full"
        aria-disabled={selected}
      >
        {chain.name}
      </Link>
    </Dropdown.Item>
  );
}

export function NetworkSelector() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          radius="full"
          variant="ghost"
          color="gray"
          size="1"
          rightIcon={IconChevronDown}
          className="pl-5 text-color-gray-3"
        >
          {FUEL_CHAIN.name.replace(/fuel/i, '').trim()}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {MAINNET_NETWORKS.length ? (
          <>
            {MAINNET_NETWORKS.map((chain) => (
              <NetworkItem
                key={chain.providerUrl}
                chain={chain}
                selected={chain.providerUrl === FUEL_CHAIN.providerUrl}
              />
            ))}
            <Flex gap={'1'} width={'140px'} className="my-2">
              <Box className="border-t w-full border-gray-3" />
            </Flex>
          </>
        ) : null}
        {TESTNET_NETWORKS.map((chain) => (
          <NetworkItem
            key={chain.providerUrl}
            chain={chain}
            selected={chain.providerUrl === FUEL_CHAIN.providerUrl}
          />
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
