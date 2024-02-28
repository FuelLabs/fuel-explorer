import dynamicImport from 'next/dynamic';
import { BridgeScreenLoader } from '~/systems/Bridge/components/BridgeScreenLoader';

const Page = dynamicImport(
  import('app-portal').then((mod) => mod.BridgePage),
  {
    ssr: false,
    loading: () => <BridgeScreenLoader view="bridge" />,
  },
);

export default function Bridge() {
  return <Page />;
}

export const dynamic = 'force-static';
