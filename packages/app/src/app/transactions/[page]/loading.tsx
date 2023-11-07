import { Grid } from '@fuels/ui';
import { TxCardLoader } from '~/systems/Transaction/component/TxCard/TxCard';

const PER_PAGE = 9;

export default async function Loading() {
  return (
    <div className="p-4 md:p-8 xl:p-0">
      <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-y-6 gap-x-6">
        {[...Array(PER_PAGE)].map((_, i) => (
          <TxCardLoader key={i} />
        ))}
      </Grid>
    </div>
  );
}
