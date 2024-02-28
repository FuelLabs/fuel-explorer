import dynamicImport from 'next/dynamic';
import { EcosystemScreenLoader } from '~/systems/Ecosystem/components/EcosystemScreenLoader';

const Page = dynamicImport(
  import('app-portal').then((mod) => mod.EcosystemPage),
  {
    ssr: false,
    loading: () => <EcosystemScreenLoader />,
  },
);

export default function Ecosystem() {
  return <Page />;
}

export const dynamic = 'force-static';
