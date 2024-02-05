/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChainInfo } from "fuels";
import type { GraphQLField, GraphQLResolveInfo } from "graphql/type";

import { getClient } from "./client";

/** @todo: Get types from the query directly instead of creating custom types */
export type ChainInfoResult = {
	consensusParameters: {
		gasPriceFactor: string;
		gasPerByte: string;
	};
};
export type Context = {
	url: string;
	chainInfo: ChainInfo;
};

export class Domain<S = any, A = any> {
	source!: S;
	args!: A;
	context!: Context;
	info!: GraphQLResolveInfo;
	constructor() {}

	createResolver(key: string, func?: string) {
		return {
			[key]: {
				resolve: async (
					source: S,
					args: A,
					context: Context,
					info: GraphQLResolveInfo,
				) => {
					this.source = source;
					this.args = args;
					this.context = context;
					this.info = info;
					return func ? this[func]() : this[key as string] ?? null;
				},
			},
		} as Record<string, Partial<GraphQLField<S, Context, A>>>;
	}

	async query<R, V extends Record<string, any> = Record<string, any>>(
		val: string,
		variables: V = {} as V,
	) {
		const client = getClient(this.context.url);
		return client.request<R>(val, variables);
	}
}
