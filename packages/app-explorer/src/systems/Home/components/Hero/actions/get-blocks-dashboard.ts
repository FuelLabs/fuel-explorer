import { sdk } from '~/systems/Core/utils/sdk';

export const getBlocksDashboard = async () => {
  const { data } = await sdk.getBlocksDashboard();
  return data;
};
