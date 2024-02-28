import dynamicImport from 'next/dynamic';
import { EcosystemScreenLoader } from '~/systems/Ecosystem/components/EcosystemScreenLoader';

const Page = dynamicImport(
  async () => import('~/systems/Ecosystem/screens/EcosystemScreen'),
  {
    ssr: false,
    loading: EcosystemScreenLoader,
  },
);

export default function Ecosystem() {
  return <Page />;
}

export const dynamic = 'force-static';
