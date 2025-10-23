import { Helmet } from 'react-helmet-async';
import { BlocksScreen } from '~/systems/Block/screens/BlockScreen';

export function BlocksPage() {
  return (
    <>
      <Helmet>
        <title>Fuel Explorer - Blocks</title>
        <meta
          name="description"
          content="View recent blocks on the Fuel blockchain"
        />
      </Helmet>

      <BlocksScreen />
    </>
  );
}
