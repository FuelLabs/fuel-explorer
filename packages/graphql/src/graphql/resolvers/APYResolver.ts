import { env } from '~/config';
import { logger } from '~/core/Logger';
import DataCache from '~/infra/cache/DataCache';

const ONE_UNIT = 10n ** 9n;
const INITIAL_SUPPLY = 10_000_000_000n * ONE_UNIT;
// 30 minutes
const CACHE_EXPIRATION = 1000 * 60 * 30;

export class APYResolver {
  static create() {
    const resolvers = new APYResolver();
    return {
      Query: {
        stakingAPY: resolvers.stakingAPY,
      },
    };
  }

  async stakingAPY() {
    logger.debug('GraphQL', 'APYResolver.stakingAPY');
    const cachedAPY = DataCache.getInstance().get('staking-apy');

    if (cachedAPY)
      return {
        amount: cachedAPY,
      };

    const network = env.get('FUEL_CHAIN');
    const prfixUrl =
      network === 'mainnet' ? 'rest-fuel-seq' : 'testnet-rest-fuel-seq';
    const baseUrl = `https://${prfixUrl}.simplystaking.xyz`;
    const poolResp = await fetch(
      new URL('/cosmos/staking/v1beta1/pool', baseUrl),
    ).then((resp) => resp.json());
    const inflationResp = await fetch(
      new URL('/cosmos/mint/v1beta1/inflation', baseUrl),
    ).then((resp) => resp.json());
    const inflation = BigInt(Number(inflationResp.inflation) * 100);
    const totalDelegation = BigInt(poolResp.pool.bonded_tokens);
    const totalInflation = (INITIAL_SUPPLY / 100n) * inflation;
    const APY = (totalInflation * 100n) / totalDelegation;

    DataCache.getInstance().save(
      'staking-apy',
      CACHE_EXPIRATION,
      APY.toString(),
    );

    return {
      amount: APY.toString(),
    };
  }
}
