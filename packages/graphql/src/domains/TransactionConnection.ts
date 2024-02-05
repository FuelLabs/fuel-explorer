import { Domain } from "../utils/domain";
import { getFieldsValues, removeDuplicates } from "../utils/getFieldsValues";

import { AccountDomain } from "./Account";
import { TokenDomain } from "./Token";

export class TransactionConnectionDomain extends Domain {
	static createResolvers() {
		const domain = new TransactionConnectionDomain();
		return {
			...domain.createResolver("tokens"),
			...domain.createResolver("accounts"),
		};
	}

	get tokens() {
		const { source: connection, context, info } = this;
		const assetsId = removeDuplicates(
			getFieldsValues(connection.nodes, ["assetId"]),
		);
		return TokenDomain.delegateQuery(assetsId, context, info);
	}

	get accounts() {
		const { source: connection, context, info } = this;
		const assetsId = removeDuplicates(
			getFieldsValues(connection.nodes, [
				"to",
				"owner",
				"recipient",
				"sender",
				"toAddress",
			]),
		);
		return AccountDomain.delegateQuery(assetsId, context, info);
	}
}
