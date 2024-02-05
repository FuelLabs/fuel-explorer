import { gql } from "graphql-request";

import type { Balance } from "../generated/types";
import { Domain } from "../utils/domain";

export class BalanceDomain extends Domain<Balance> {
	static createResolvers() {
		const domain = new BalanceDomain();
		return {
			...domain.createResolver("utxos", "getUtxos"),
		};
	}

	async getUtxos() {
		const { source: connection } = this;
		const query = gql`
      query getUtxos($assetId: AssetId!, $owner: Address!) {
        coins(first: 100, filter: { assetId: $assetId, owner: $owner }) {
          nodes {
            amount
            utxoId
            txCreatedIdx
            blockCreated
          }
        }
      }
    `;

		type UtxosResponse = {
			coins: {
				nodes: {
					amount: string;
					utxoId: string;
					txCreatedIdx: number;
					blockCreated: number;
				}[];
			};
		};

		const res = await this.query<UtxosResponse>(query, connection);
		const data = res.coins.nodes;
		return data;
	}
}
