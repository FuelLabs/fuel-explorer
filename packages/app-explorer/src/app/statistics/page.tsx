import dynamicImport from 'next/dynamic';

const Page = dynamicImport(
  async () => import('~/systems/Statistics/screens/StatisticsScreen'),
  {
    ssr: false,
    // loading: EcosystemScreenLoader,
  },
);

export default function Statistics() {
  return <Page />;
}

export const dynamic = 'force-static';
