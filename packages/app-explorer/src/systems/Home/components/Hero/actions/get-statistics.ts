'use server';
import { sdk } from '~/systems/Core/utils/sdk';

export const getStatistics = async () => {
  const statistics = await sdk.statistics();
  return statistics.data?.statistics?.nodes ?? null;
};
