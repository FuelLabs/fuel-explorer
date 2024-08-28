import dynamicImport from 'next/dynamic';

const Page = dynamicImport(
  async () => import('~/systems/NFTs/screens/NFTsScreen'),
  {
    ssr: false,
  },
);

export default function NFTs() {
  return <Page />;
}

export const dynamic = 'force-static';
