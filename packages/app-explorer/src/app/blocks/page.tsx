import dynamicImport from 'next/dynamic';
const Page = dynamicImport(
  async () => import('~/systems/Home/screens/BlocksScreen'),
  {
    ssr: false,
    //   loading: () => <BridgeScreenLoader view="bridge" />,
  },
);
export default function Blocks() {
  return <Page />;
}

export const dynamic = 'force-static';
