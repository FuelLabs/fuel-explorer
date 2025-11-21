import cors from 'cors';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { Provider } from 'fuels';
import GetAccountAssets from '~/application/uc/GetAccountAssets';
import GetAssetsRate from '~/application/uc/GetAssetsRate';
import GetMetrics from '~/application/uc/GetMetrics';
import GetAssetDetails from '~/application/uc/IndexAsset/GetAssetDetails';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import { blockResolver } from '~/graphql/resolvers';
import { APYResolver } from '~/graphql/resolvers/APYResolver';
import BalanceDAO from '../dao/BalanceDAO';
import BlockDAO from '../dao/BlockDAO';
import BridgeDAO from '../dao/BridgeDAO';
import CosmosDAO from '../dao/CosmosDAO';
import L1DAO from '../dao/L1DAO';
import StakingDAO from '../dao/StakingDAO';
import { getStakingTransactions } from '../dao/TEMP_StakingDAO';
import { convertToUsd } from '../dao/utils';
import AssetGateway from '../gateway/AssetGateway';
import PaginatedParams from '../paginator/PaginatedParams';

export class Server {
  // Metrics cache with 3-second TTL
  private cachedMetrics: string | null = null;
  private lastMetricsTime = 0;
  private readonly METRICS_CACHE_TTL = 3000; // 3 seconds

  async setup() {
    const app = express();
    app.use(cors<cors.CorsRequest>());
    app.use(express.json());

    const providerUrl = env.get('FUEL_PROVIDER');
    if (!providerUrl) {
      throw new Error('FUEL_PROVIDER is not set');
    }
    const provider = new Provider(providerUrl);
    const chainId = await provider.getChainId();
    const baseAssetId = await provider.getBaseAssetId();
    blockResolver.startPoolingAnalytics({ chainId, baseAssetId });

    app.get('/staking/apy', async (_req: Request, res: Response) => {
      logger.debug('API', 'Get staking APY');
      const getStakingAPY = new APYResolver();
      const result = await getStakingAPY.stakingAPY();
      res.json(result);
    });

    app.get('/staking/events', async (_req: Request, res: Response) => {
      logger.debug('API', 'Get staking events');
      const address = _req.query.address;
      const paginatedParams = new PaginatedParams(_req.query);
      const stakingDAO = new StakingDAO();
      const output = await stakingDAO.getEvents(
        String(address),
        paginatedParams,
      );
      res.json(output);
    });

    app.get('/bridge/events', async (req: Request, res: Response) => {
      logger.debug('API', 'Get bridge events');
      const address = req.query.address;
      const limit = Math.min(Number(req.query.limit), 20);
      const offset = Number(req.query.offset);
      const bridgeDAO = new BridgeDAO();
      const output = await bridgeDAO.getEvents(String(address), limit, offset);
      res.json(output);
    });

    app.get('/bridge/deposit/logs', async (req: Request, res: Response) => {
      logger.debug('API', 'Get deposit logs');
      const address = req.query.address;
      const recipient = req.query.recipient;
      const predicate = req.query.predicate;
      const bridgeDAO = new BridgeDAO();
      const output = await bridgeDAO.queryLogsForRecipient(
        String(address),
        String(recipient),
        String(predicate),
      );
      res.json(output);
    });

    app.get('/bridge/block/hashes', async (req: Request, res: Response) => {
      logger.debug('API', 'Get block hashes');
      const address = req.query.address;
      const fromBlock = req.query.from_block;
      const bridgeDAO = new BridgeDAO();
      const output = await bridgeDAO.queryBlockHashes(
        String(address),
        Number(fromBlock),
      );
      res.json(output);
    });

    app.get(
      '/bridge/message/relayed/hash',
      async (req: Request, res: Response) => {
        logger.debug('API', 'Get message relayed logs');
        const address = req.query.address;
        const messageId = req.query.message_id;
        const bridgeDAO = new BridgeDAO();
        const output = await bridgeDAO.queryMessageRelayedTxHash(
          String(address),
          String(messageId),
        );
        res.json(output);
      },
    );

    app.get(
      '/bridge/:eventType/:eventId',
      async (req: Request, res: Response) => {
        logger.debug('API', 'Get bridge event');
        const eventId = Number(req.params.eventId);
        const eventType = String(req.params.eventType);
        const bridgeDAO = new BridgeDAO();
        const output = await bridgeDAO.getEvent(eventType, eventId);
        res.json(output);
      },
    );

    app.get('/staking/events/:eventId', async (req: Request, res: Response) => {
      logger.debug('API', 'Get staking event by id');
      const eventId = Number(req.params.eventId);
      if (!Number.isInteger(eventId)) {
        throw new Error('Invalid event id');
      }
      const stakingDAO = new StakingDAO();
      const output = await stakingDAO.getEvent(eventId);
      res.json(output);
    });

    app.get('/health', async (_req: Request, res: Response) => {
      logger.debug('API', 'Health');
      res.json({
        status: 'ok',
      });
    });

    app.get('/metrics', async (_req: Request, res: Response) => {
      logger.debug('API', 'Metrics');
      const now = Date.now();

      // Return cached metrics if still valid (within TTL)
      if (
        this.cachedMetrics &&
        now - this.lastMetricsTime < this.METRICS_CACHE_TTL
      ) {
        res.setHeader('content-type', 'text/plain');
        res.send(this.cachedMetrics);
        return;
      }

      // Fetch fresh metrics if cache expired
      const getMetrics = new GetMetrics();
      const output = await getMetrics.execute();
      const lines: any = [];
      for (const element in output) {
        lines.push(`${element} ${output[element]}`);
      }

      // Cache the result
      const metricsText = lines.join('\n');
      this.cachedMetrics = metricsText;
      this.lastMetricsTime = now;

      res.setHeader('content-type', 'text/plain');
      res.send(metricsText);
    });

    app.get('/blocks/:height', async (_req: Request, res: Response) => {
      const height = _req.params.height;
      logger.debug('API', 'Get Block', height);
      const blockDAO = new BlockDAO();
      const output = await blockDAO.getByHeight(Number(height));
      if (!output) {
        return res.status(404).end();
      }
      res.json(output.data);
    });

    app.get(
      '/accounts/:accountHash/balance',
      async (_req: Request, res: Response) => {
        const accountHash = _req.params.accountHash;
        const assetId = String(_req.query.asset_id);
        const blockHeight = _req.query.block_height
          ? Number(_req.query.block_height)
          : null;
        logger.debug(
          'API',
          'Get Balance',
          `Account: ${accountHash} Asset: ${assetId} Block: ${blockHeight}`,
        );
        const balanceDAO = new BalanceDAO();
        const output = await balanceDAO.getBalance(
          accountHash,
          assetId,
          blockHeight,
        );
        if (!output) {
          return res.status(404).end();
        }
        const assetGateway = new AssetGateway();
        const asset = await assetGateway.getAsset(assetId, chainId);
        res.json({
          accountHash: output.account_hash,
          assetId: output.asset_id,
          blockHeight: output.block_height,
          balance: output.balance,
          balanceInUsd: asset.rate
            ? convertToUsd(output.balance, asset.decimals, asset.rate).formatted
            : null,
        });
      },
    );

    app.get('/assets/:assetId', async (_req: Request, res: Response) => {
      const assetId = _req.params.assetId;
      logger.debug('API', 'Get Asset', assetId);
      const assetGateway = new AssetGateway();
      const output = await assetGateway.getAsset(assetId, chainId);
      res.json(output);
    });

    app.get('/assets/:assetId/details', async (req: Request, res: Response) => {
      const assetId = req.params.assetId;
      logger.debug('API', 'Get Asset Details', assetId);

      const getAssetDetails = new GetAssetDetails();
      const output = await getAssetDetails.executeCached(assetId);

      if (!output) {
        return res.status(404).json({ message: 'Asset not found' });
      }

      res.json(output);
    });

    app.get(
      '/accounts/:accountId/assets',
      async (_req: Request, res: Response) => {
        const accountId = _req.params.accountId;
        const last = Number(_req.query.last) || 100;
        logger.debug('API', 'Get Account Assets', accountId);
        const getAccountAssets = new GetAccountAssets();
        const output = await getAccountAssets.execute({ accountId, last });
        res.json(output);
      },
    );

    app.get('/assets_rate', async (_req: Request, res: Response) => {
      logger.debug('API', 'Get Assets Rate');
      const getAssetsRate = new GetAssetsRate();
      const output = await getAssetsRate.executeCached();
      res.json(output);
    });

    app.post('/convert_rate', async (_req: Request, res: Response) => {
      logger.debug('API', 'Post Convert Rate');
      const assetId = _req.body.assetId;
      const amount = _req.body.amount;
      const assetGateway = new AssetGateway();
      const asset = await assetGateway.getAsset(assetId, chainId);
      if (!asset) {
        return res.status(422).json({
          message: 'Could not convert because asset was not found',
        });
      }
      if (!asset.verified || !asset.rate) {
        return res.status(422).json({
          message: 'Could not convert because asset has no conversion rate',
        });
      }
      return res.json({
        amount: asset.rate
          ? convertToUsd(amount, asset.decimals, asset.rate).formatted
          : null,
      });
    });

    app.get(
      '/contracts_l1/:contractHash',
      async (_req: Request, res: Response) => {
        const contractHash = _req.params.contractHash;
        const event = _req.query.event;
        const key = _req.query.key;
        const value = _req.query.value;
        if (!contractHash || !event || !key) {
          logger.error('API', 'Contracts L1 missing params');
          return res.status(442).end();
        }
        logger.debug('API', 'Contracts L1', contractHash);
        const l1DAO = new L1DAO();
        const output = await l1DAO.getContractEvent(
          contractHash,
          String(event),
          String(key),
          String(value),
        );
        res.json(output);
      },
    );

    app.get('/staking-transactions', async (req: Request, res: Response) => {
      logger.debug('API', 'Get TEMP staking transactions by address');
      const address = req.query.address as string;
      const output = await getStakingTransactions(address);
      res.json(output);
    });

    app.get('/cosmos', async (_req: Request, res: Response) => {
      const type = _req.query.type;
      const key = _req.query.key;
      const value = _req.query.value;
      if (!type || !key) {
        logger.error('API', 'Cosmos missing params');
        return res.status(422).end();
      }
      logger.debug('API', 'Cosmos', type);
      const cosmosDAO = new CosmosDAO();
      const output = await cosmosDAO.getCosmosEvents(
        String(type),
        String(key),
        String(value),
      );
      res.json(output);
    });

    // Return all errors as 400 with a message payload
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      logger.error('API', `Error occurred: ${err.message}`, err);
      res.status(400).json({ message: err.message });
    });

    return app;
  }

  async listen(app: any, port: number) {
    return new Promise((resolve) => {
      app.listen(port, async () => {
        resolve(null);
      });
    });
  }
}
