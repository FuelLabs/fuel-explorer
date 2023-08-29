import Image from 'next/image';

const ASSETS_MAP = {
  eth: {
    id: '0x0000000000000000000000000000000000000000000000000000000000000000',
    title: 'Ethereum',
    alt: 'Ethereum Logo',
    icon: '/assets/eth.svg',
  },
};

export const SIZES_MAP = {
  sm: 24,
  md: 32,
  lg: 40,
};

type AssetIconProps = {
  asset: 'eth';
  size?: 'sm' | 'md' | 'lg' | number;
};

export function AssetIcon({ asset, size = 'md' }: AssetIconProps) {
  if (!ASSETS_MAP[asset]) {
    throw new Error(`Asset "${asset}" not found`);
  }
  const item = ASSETS_MAP[asset];
  return (
    <Image
      width={SIZES_MAP[size] || size}
      height={SIZES_MAP[size] || size}
      alt={item.alt}
      src={item.icon}
    />
  );
}
