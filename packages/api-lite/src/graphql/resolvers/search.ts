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
        return block ? { block: toBlockNode(block) } : null;
      }
      let hash: string;
      try {
        hash = Hash256.create(q).value();
      } catch {
        return null;
      }
      const bh =
        ctx.index.heightForBlock(hash) ??
        (await ctx.client.heightForBlock(hash));
      if (bh != null) {
        const b = await ctx.store.get(bh);
        if (b) return { block: toBlockNode(b) };
      }
      if (ctx.index.contract(hash)) return { contract: { _id: 0, id: hash } };
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
        if (b && i >= 0)
          return { transaction: toTxNode(b.transactions[i], th.height, i) };
      }
      if (ctx.index.accountExists(hash)) return { account: { address: hash } };
      const bytecode = ctx.index.predicate(hash);
      if (bytecode && bytecode !== '0x')
        return { predicate: { address: hash, bytecode } };
      return null;
    },
  },
};
