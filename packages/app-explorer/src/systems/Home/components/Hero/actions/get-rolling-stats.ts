'use server';
import { sdk } from '~/systems/Core/utils/sdk';

export const getRollingStats = async () => {
  const rollingStats = await sdk.rollingStats();
  return rollingStats.data?.statistics?.nodes ?? null;
};
