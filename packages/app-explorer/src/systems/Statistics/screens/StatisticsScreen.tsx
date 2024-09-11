import { Box, Container, Heading, Theme, VStack } from '@fuels/ui';
import { Grid, LineGraph } from '@fuels/ui';
import { useState } from 'react';
import { useEffect } from 'react';
import { tv } from 'tailwind-variants';
import { getBlockStats } from '../actions/getBlocks';
import { getTransactionStats } from '../actions/getTransactions';
import Hero from '../components/Hero/Hero';
// import { dummyData } from '../data/dummyData';

export const StatisticsScreen = () => {
  const classes = styles();

  const [allBlocksTimeStamp, setAllBlocksTimeStamp] = useState('null');
  const [newBlocksData, setNewBlocksData] = useState<any[]>([]);

  const [averageBlocksTimeStamp, setAverageBlocksTimeStamp] = useState('null');
  const [averageBlocksData, setAverageBlocksData] = useState<any[]>([]);

  const [dailyTransactionsTimeStamp, setDailyTransactionsTimeStamp] =
    useState('null');
  const [dailyTransactionsData, setDailyTransactionsData] = useState<any[]>([]);

  const [averageTransactionsTimeStamp, setAverageTransactionsTimeStamp] =
    useState('null');
  const [averageTransactionsData, setAverageTransactionsData] = useState<any[]>(
    [],
  );

  const getBlockStatistics = async () => {
    const data: any = await getBlockStats({
      timeFilter: allBlocksTimeStamp === 'null' ? null : allBlocksTimeStamp,
    });
    const transformedData = data
      .map((item: any) => ({
        start: item.start,
        count: item.count,
      }))
      .reverse();
    console.log(transformedData);
    setNewBlocksData(transformedData);
  };

  useEffect(() => {
    getBlockStatistics();
  }, [allBlocksTimeStamp]);

  const getAverageBlockStatistics = async () => {
    const data: any = await getBlockStats({
      timeFilter:
        averageBlocksTimeStamp === 'null' ? null : averageBlocksTimeStamp,
    });
    console.log(data);
    const transformedData = data
      .map((item: any) => ({
        start: item.start,
        count: Number.isNaN(item.totalRewards / item.count)
          ? 0
          : item.totalRewards / item.count,
      }))
      .reverse();
    console.log(transformedData);
    setAverageBlocksData(transformedData);
  };

  useEffect(() => {
    getAverageBlockStatistics();
  }, [averageBlocksTimeStamp]);

  const getTransactionStatistics = async () => {
    const data: any = await getTransactionStats({
      timeFilter:
        dailyTransactionsTimeStamp === 'null'
          ? null
          : dailyTransactionsTimeStamp,
    });
    const transformedData = data
      .map((item: any) => ({
        start: item.start,
        count: item.count,
      }))
      .reverse();
    console.log(transformedData);
    setDailyTransactionsData(transformedData);
  };

  useEffect(() => {
    getTransactionStatistics();
  }, [dailyTransactionsTimeStamp]);

  const getAverageTransactionStatistics = async () => {
    const data: any = await getTransactionStats({
      timeFilter:
        averageTransactionsTimeStamp === 'null'
          ? null
          : averageTransactionsTimeStamp,
    });
    console.log(data);
    const transformedData = data
      .map((item: any) => ({
        start: item.start,
        count: Number.isNaN(item.totalFee / item.count)
          ? 0
          : item.totalFee / item.count,
      }))
      .reverse();
    console.log(transformedData);
    setAverageTransactionsData(transformedData);
  };

  useEffect(() => {
    getAverageTransactionStatistics();
  }, [averageTransactionsTimeStamp]);

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
              <LineGraph
                dataProp={newBlocksData}
                titleProp={'New Block'}
                selectedDays={allBlocksTimeStamp}
                setSelectedDays={setAllBlocksTimeStamp}
              />
              <LineGraph
                dataProp={averageBlocksData}
                titleProp={'Avg. Block Reward'}
                selectedDays={averageBlocksTimeStamp}
                setSelectedDays={setAverageBlocksTimeStamp}
              />
            </Grid>
          </div>

          <div className="text-heading text-md font-mono my-20">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              Transactions
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph
                dataProp={dailyTransactionsData}
                titleProp={'Total Transactions (Cumilative)'}
                selectedDays={dailyTransactionsTimeStamp}
                setSelectedDays={setDailyTransactionsTimeStamp}
              />
              <LineGraph
                dataProp={dailyTransactionsData}
                titleProp={'Daily Transactions'}
                selectedDays={dailyTransactionsTimeStamp}
                setSelectedDays={setDailyTransactionsTimeStamp}
              />
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'Transaction Fee Spent (Cumilative)'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'Avg. Transactions Fee'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
            </Grid>
          </div>

          <div className="text-heading text-md font-mono my-20">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              Accounts
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'Total Active (Cumilative)'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'Daily Active Accounts'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'New Accounts'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
            </Grid>
          </div>

          <div className="text-heading text-md font-mono my-20">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              Tokens
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'Total Tokens (Cumilative)'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'New Tokens'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
            </Grid>
          </div>

          <div className="text-heading text-md font-mono my-10">
            <h2 className="font-mono" style={{ fontSize: '1.5rem' }}>
              NFTs
            </h2>
            <Grid className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'Total NFTs (Cumilative)'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
              <LineGraph
                dataProp={averageTransactionsData}
                titleProp={'New NFTs'}
                selectedDays={averageTransactionsTimeStamp}
                setSelectedDays={setAverageTransactionsTimeStamp}
              />
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
