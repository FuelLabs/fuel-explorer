import { Hash256 } from '~/application/vo';
import type { AppContext } from '../context';
import { toBlockNode } from './blocks';
import { toTxNode } from './transactions';

export const searchResolvers = {
  Query: {
    async search(_: unknown, args: { query: string }, ctx: AppContext) {
      const q = args.query.trim();
      if (!q.startsWith('0x') && !Number.isNaN(Number(q)) && q !== '') {
        const n = Number(q);
        // Reject heights fuel-core has never produced (and non-finite values like
        // Infinity/1e30) before they reach store.get, which throws building the S3 key.
        if (!Number.isFinite(n) || n < 0 || n > ctx.tip.fuelCoreTip)
          return null;
        const block = await ctx.store.get(n);
        if (!block) return null;
        ctx.hot.hit('block', String(n));
        return { block: toBlockNode(block) };
      }
      let hash: string;
      try {
        hash = Hash256.create(q).value();
      } catch {
        return null;
      }
      // Each lookup below is isolated behind its own try/catch, mirroring
      // production's Promise.allSettled containment in SearchResolver. A
      // malformed/truncated hash makes fuel-core reject it as an invalid
      // BlockId/TransactionId, but a throw here can just as easily mean a
      // real fuel-core outage or local index corruption -- so every catch
      // logs once (search <stage> failed) instead of swallowing silently,
      // while still falling through to the remaining checks instead of
      // crashing the whole query.
      try {
        const bh =
          ctx.index.heightForBlock(hash) ??
          (await ctx.client.heightForBlock(hash));
        if (bh != null) {
          const b = await ctx.store.get(bh);
          if (b) {
            ctx.hot.hit('block', String(bh));
            return { block: toBlockNode(b) };
          }
        }
      } catch (err) {
        console.error('search block failed', err);
      }
      try {
        if (ctx.index.contract(hash)) return { contract: { _id: 0, id: hash } };
      } catch (err) {
        console.error('search contract failed', err);
      }
      try {
        const th =
          ctx.index.heightForTx(hash) ??
          (await ctx.client
            .heightForTx(hash)
            .then((h) => (h == null ? null : { height: h, txIndex: -1 })));
        if (th) {
          const b = await ctx.store.get(th.height);
          const i =
            th.txIndex >= 0
              ? th.txIndex
              : (b?.transactions.findIndex((t) => t.id === hash) ?? -1);
          if (b && i >= 0) {
            ctx.hot.hit('tx', hash);
            return { transaction: toTxNode(b.transactions[i], th.height, i) };
          }
        }
      } catch (err) {
        console.error('search transaction failed', err);
      }
      try {
        if (ctx.index.accountExists(hash)) {
          ctx.hot.hit('account', hash);
          return { account: { address: hash } };
        }
      } catch (err) {
        console.error('search account failed', err);
      }
      try {
        const bytecode = ctx.index.predicate(hash);
        if (bytecode && bytecode !== '0x')
          return { predicate: { address: hash, bytecode } };
      } catch (err) {
        console.error('search predicate failed', err);
      }
      return null;
    },
  },
};
