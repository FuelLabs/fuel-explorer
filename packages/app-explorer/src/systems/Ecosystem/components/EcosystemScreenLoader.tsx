import { Flex, Grid, LoadingBox, VStack } from '@fuels/ui';
import { EcosystemHeader } from 'app-portal';
import { tv } from 'tailwind-variants';

export function EcosystemScreenLoader() {
  const classes = styles();
  return (
    <VStack gap="6" flexGrow="1" className={classes.content()}>
      <EcosystemHeader disabled />
      <Flex justify="start" align="center" gap="3" wrap="wrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <LoadingBox className="w-[80px] h-[32px]" key={i} />
        ))}
      </Flex>
      <Grid gap="4" className="grid-cols-1 tablet:grid-cols-2">
        <LoadingBox className="w-full h-40" />
        <LoadingBox className="w-full h-40" />
        <LoadingBox className="w-full h-40" />
        <LoadingBox className="w-full h-40" />
        <LoadingBox className="w-full h-40" />
        <LoadingBox className="w-full h-40" />
      </Grid>
    </VStack>
  );
}

const styles = tv({
  slots: {
    content: 'pb-20',
    searchBar: 'flex-col tablet:justify-between tablet:flex-row',
    searchBarInput: 'w-full tablet:w-[350px]',
  },
});
