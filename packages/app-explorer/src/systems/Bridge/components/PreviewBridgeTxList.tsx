import { Asset, CardList, Flex, FuelLogo, Spinner, Text } from '@fuels/ui';
import type { Asset as FuelsAsset } from 'fuels';
import { useAsset } from '~portal/systems/Assets';
import { BridgeTxItem } from '~portal/systems/Bridge/components';
import { ActionRequiredBadge } from '~portal/systems/Chains/fuel/components';

// Dev-only stand-in for accounts with no transfers. Never rendered in builds.

const iconUrl = (name: string) =>
  `https://verified-assets.fuel.network/images/${name}.svg`;

const USDC = {
  name: 'USDC',
  symbol: 'USDC',
  icon: iconUrl('usdc'),
  networks: [],
} as unknown as FuelsAsset;

const FUEL = {
  name: 'Fuel',
  symbol: 'FUEL',
  icon: iconUrl('fuel'),
  networks: [],
} as unknown as FuelsAsset;

type Status = 'settled' | 'processing' | 'action';

const ROWS: {
  id: string;
  toFuel: boolean;
  asset: 'ETH' | 'USDC' | 'FUEL';
  amount: string;
  minutesAgo: number;
  status: Status;
}[] = [
  {
    id: '0x01',
    toFuel: true,
    asset: 'ETH',
    amount: '0.25',
    minutesAgo: 3,
    status: 'processing',
  },
  {
    id: '0x02',
    toFuel: false,
    asset: 'USDC',
    amount: '1,200.00',
    minutesAgo: 42,
    status: 'action',
  },
  {
    id: '0x03',
    toFuel: true,
    asset: 'FUEL',
    amount: '15,000',
    minutesAgo: 180,
    status: 'settled',
  },
  {
    id: '0x04',
    toFuel: false,
    asset: 'ETH',
    amount: '1.10',
    minutesAgo: 1440,
    status: 'settled',
  },
  {
    id: '0x05',
    toFuel: true,
    asset: 'USDC',
    amount: '350.00',
    minutesAgo: 2880,
    status: 'settled',
  },
  {
    id: '0x06',
    toFuel: true,
    asset: 'ETH',
    amount: '0.05',
    minutesAgo: 4320,
    status: 'settled',
  },
  {
    id: '0x07',
    toFuel: false,
    asset: 'FUEL',
    amount: '2,500',
    minutesAgo: 7200,
    status: 'settled',
  },
  {
    id: '0x08',
    toFuel: true,
    asset: 'ETH',
    amount: '3.00',
    minutesAgo: 10080,
    status: 'settled',
  },
  {
    id: '0x09',
    toFuel: false,
    asset: 'USDC',
    amount: '80.00',
    minutesAgo: 20160,
    status: 'settled',
  },
  {
    id: '0x0a',
    toFuel: true,
    asset: 'FUEL',
    amount: '500',
    minutesAgo: 43200,
    status: 'settled',
  },
  {
    id: '0x0b',
    toFuel: false,
    asset: 'ETH',
    amount: '0.40',
    minutesAgo: 60480,
    status: 'settled',
  },
  {
    id: '0x0c',
    toFuel: true,
    asset: 'USDC',
    amount: '2,000.00',
    minutesAgo: 86400,
    status: 'settled',
  },
  {
    id: '0x0d',
    toFuel: true,
    asset: 'ETH',
    amount: '0.75',
    minutesAgo: 129600,
    status: 'settled',
  },
  {
    id: '0x0e',
    toFuel: false,
    asset: 'FUEL',
    amount: '9,800',
    minutesAgo: 172800,
    status: 'settled',
  },
];

function StatusLabel({ status }: { status: Status }) {
  if (status === 'action') return <ActionRequiredBadge />;
  if (status === 'processing') {
    return (
      <Flex align="center" gap="1">
        <Spinner size={14} />
        <Text className="text-xs">Processing</Text>
      </Flex>
    );
  }
  return <Text className="text-xs text-muted text-right">Settled</Text>;
}

export function PreviewBridgeTxList() {
  const { asset: eth } = useAsset();
  const assets = { ETH: eth, USDC, FUEL };
  const ethLogo = (
    <Asset asset={eth} iconSize={18}>
      <Asset.Icon />
    </Asset>
  );
  const fuelLogo = <FuelLogo size={17} />;

  return (
    <CardList isClickable className="cursor-pointer select-none">
      {ROWS.map((row) => (
        <BridgeTxItem
          key={row.id}
          txId={row.id}
          asset={assets[row.asset]}
          amount={row.amount}
          date={new Date(Date.now() - row.minutesAgo * 60_000)}
          fromLogo={row.toFuel ? ethLogo : fuelLogo}
          toLogo={row.toFuel ? fuelLogo : ethLogo}
          status={<StatusLabel status={row.status} />}
          onClick={() => {}}
        />
      ))}
    </CardList>
  );
}
