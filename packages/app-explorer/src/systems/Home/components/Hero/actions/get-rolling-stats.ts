'use server';
import { sdk } from '~/systems/Core/utils/sdk';

export const getRollingStats = async () => {
  const rollingStats = await sdk.rollingStats();
  const data = rollingStats.data.statistics.nodes;
  return data;
};
