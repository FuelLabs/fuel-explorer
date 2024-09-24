import { sdk } from '~/systems/Core/utils/sdk';

export const getTPS = async () => {
  const { data } = await sdk.tps();
  return data;
};
