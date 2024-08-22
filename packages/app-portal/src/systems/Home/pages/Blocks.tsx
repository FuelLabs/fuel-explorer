import { VStack } from '@fuels/ui';
import BlocksTable from '../components/BlocksTable/BlocksTable';
import { Hero } from '../components/Hero/Hero';

// import { DateTime } from 'fuels';
function Blocks() {
  return (
    <VStack>
      <Hero />

      {/* <BlockTimeItem time={DateTime.now()} /> */}
      <div>
        <BlocksTable />
      </div>
    </VStack>
  );
}

export default Blocks;
