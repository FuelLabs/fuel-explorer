import { Grid } from '@fuels/ui';
import { TxCardLoader } from '~/systems/Transaction/component/TxCard/TxCard';

const PER_PAGE = 9;

export default async function Loading() {
  return (
    <Grid columns="3" gap="6">
      {[...Array(PER_PAGE)].map((_, i) => (
        <TxCardLoader key={i} />
      ))}
    </Grid>
  );
}
