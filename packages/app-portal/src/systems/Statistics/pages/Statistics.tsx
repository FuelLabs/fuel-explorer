import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';
import { Grid, LineGraph } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import Hero from '../components/Hero/Hero';
import { dummyData } from '../data/dummyData';

export const Statistics = () => {
  const classes = styles();
  return (
    <Theme appearance="light">
      <Box className={classes.root()}>
        <Container className={classes.container()}>
          <VStack>
            <Heading as="h1" className={classes.title()}>
              Statistics
            </Heading>
            <div className="pb-6">
              <Hero />
            </div>
          </VStack>

          <div className="text-heading text-md font-mono my-20">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              Blocks
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph dataProp={dummyData} titleProp={'New Block'} />
              <LineGraph dataProp={dummyData} titleProp={'Avg. Block Reward'} />
            </Grid>
          </div>

          <div className="text-heading text-md font-mono my-20">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              Transactions
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph
                dataProp={dummyData}
                titleProp={'Total Transactions (Cumilative)'}
              />
              <LineGraph
                dataProp={dummyData}
                titleProp={'Daily Transactions'}
              />
              <LineGraph
                dataProp={dummyData}
                titleProp={'Transaction Fee Spent (Cumilative)'}
              />
              <LineGraph
                dataProp={dummyData}
                titleProp={'Avg. Tansaction Fee'}
              />
            </Grid>
          </div>

          <div className="text-heading text-md font-mono my-20">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              Accounts
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph
                dataProp={dummyData}
                titleProp={'Total Active (Cumilative)'}
              />
              <LineGraph
                dataProp={dummyData}
                titleProp={'Daily Active Accounts'}
              />
              <LineGraph dataProp={dummyData} titleProp={'New Accounts'} />
            </Grid>
          </div>

          <div className="text-heading text-md font-mono my-20">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              Tokens
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph
                dataProp={dummyData}
                titleProp={'Total Tokens (Cumilative)'}
              />
              <LineGraph dataProp={dummyData} titleProp={'New Tokens'} />
            </Grid>
          </div>

          <div className="text-heading text-md font-mono my-10">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              NFTs
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph
                dataProp={dummyData}
                titleProp={'Total NFTs (Cumilative)'}
              />
              <LineGraph dataProp={dummyData} titleProp={'New NFTs'} />
            </Grid>
          </div>
        </Container>
      </Box>
    </Theme>
  );
};

const styles = tv({
  slots: {
    root: 'overflow-clip relative w-full border-border bg-gray-3 dark:bg-gray-1',
    container: [
      'z-20 relative py-8 pt-6 px-8 tablet:pt-18 tablet:px-10',
      'tablet:max-laptop:max-w-[500px] [&_.rt-ContainerInner]:p-2',
      ' [&_.rt-ContainerInner]:tablet:max-laptop:bg-opacity-60 [&_.rt-ContainerInner]:tablet:max-laptop:rounded-lg [&_.rt-ContainerInner]:tablet:max-laptop:shadow-2xl',
    ],
    input: 'w-full tablet:w-[400px]',
    title: [
      'text-2xl leading-snug text-heading justify-center',
      'tablet:text-left tablet:text-4xl tablet:justify-start',
    ],
    subtitle: ['text-base mb-8 justify-center'],
    searchWrapper: 'grid grid-cols-12 grid-rows-auto auto-rows-min gap-5',
  },
});
