'use server';
import { sdk } from '~/systems/Core/utils/sdk';

export const getStatistics = async () => {
  const statistics = await sdk.statistics();
  const data = statistics.data.statistics.nodes;
  return data;
};
