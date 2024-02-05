import type { Address as FuelAddress, Provider as FuelProvider } from "fuels";
import type { PublicClient } from "wagmi";
import type { ActorRefFrom, InterpreterFrom, StateFrom } from "xstate";
import { assign, createMachine, spawn } from "xstate";
import { isEthChain, isFuelChain, txFuelToEthMachine } from "~/systems/Chains";
import { txEthToFuelMachine } from "~/systems/Chains/eth/machines";
import { FetchMachine, delay } from "~/systems/Core";

import { BridgeService } from "../services";
import type { BridgeInputs } from "../services";
import type { BridgeTx } from "../types";

export type BridgeTxsMachineContext = {
	ethToFuelTxRefs: {
		[key: string]: ActorRefFrom<typeof txEthToFuelMachine>;
	};
	fuelToEthTxRefs: {
		[key: string]: ActorRefFrom<typeof txFuelToEthMachine>;
	};
	bridgeTxs?: BridgeTx[] | undefined;
	fuelProvider?: FuelProvider;
	ethPublicClient?: PublicClient;
	fuelAddress?: FuelAddress;
};

type MachineServices = {
	fetchTxs: {
		data: BridgeTx[] | undefined;
	};
};

export type BridgeTxsMachineEvents =
	| {
			type: "FETCH";
			input: BridgeInputs["fetchTxs"];
	  }
	| {
			type: "ADD_TX_ETH_TO_FUEL";
			input: {
				ethTxId?: `0x${string}`;
			} & BridgeInputs["fetchTxs"];
	  }
	| {
			type: "ADD_TX_FUEL_TO_ETH";
			input: {
				fuelTxId?: string;
			} & Omit<BridgeInputs["fetchTxs"], "fuelAddress">;
	  };

export const bridgeTxsMachine = createMachine(
	{
		// eslint-disable-next-line @typescript-eslint/consistent-type-imports
		tsTypes: {} as import("./bridgeTxsMachine.typegen").Typegen0,
		schema: {
			context: {} as BridgeTxsMachineContext,
			services: {} as MachineServices,
			events: {} as BridgeTxsMachineEvents,
		},
		predictableActionArguments: true,
		id: "(machine)",
		initial: "idle",
		states: {
			idle: {
				on: {
					FETCH: {
						actions: ["assignFetchInputs"],
						target: "fetching",
					},
					ADD_TX_ETH_TO_FUEL: {
						actions: ["assignTxEthToFuel"],
					},
					ADD_TX_FUEL_TO_ETH: {
						actions: ["assignTxFuelToEth"],
					},
				},
			},
			fetching: {
				tags: ["isLoading"],
				invoke: {
					src: "fetchTxs",
					data: {
						input: (ctx: BridgeTxsMachineContext) => ({
							ethPublicClient: ctx.ethPublicClient,
							fuelProvider: ctx.fuelProvider,
							fuelAddress: ctx.fuelAddress,
						}),
					},
					onDone: [
						{
							cond: FetchMachine.hasError,
							target: "idle",
						},
						{
							actions: ["assignTxMachines", "assignBridgeTxs"],
							target: "idle",
						},
					],
				},
			},
		},
	},
	{
		actions: {
			assignFetchInputs: assign((ctx, ev) => ({
				fuelProvider: ev.input?.fuelProvider || ctx.fuelProvider,
				ethPublicClient: ev.input?.ethPublicClient || ctx.ethPublicClient,
				fuelAddress: ev.input?.fuelAddress,
			})),
			assignTxMachines: assign({
				ethToFuelTxRefs: (ctx, ev) => {
					const ethToFuelBridgeTxs = ev.data?.filter(({ fromNetwork }) =>
						isEthChain(fromNetwork),
					);

					const newRefs = ethToFuelBridgeTxs?.reduce((prev, tx) => {
						// safely avoid overriding instance
						if (ctx.ethToFuelTxRefs?.[tx.txHash]) return prev;

						return {
							...prev,
							[tx.txHash]: spawn(
								txEthToFuelMachine.withContext({
									ethTxId: tx.txHash as `0x${string}`,
									fuelAddress: ctx.fuelAddress,
									fuelProvider: ctx.fuelProvider,
									ethPublicClient: ctx.ethPublicClient,
								}),
								{ name: tx.txHash, sync: true },
							),
						};
					}, {});

					return {
						...(ctx.ethToFuelTxRefs || {}),
						...newRefs,
					};
				},
				fuelToEthTxRefs: (ctx, ev) => {
					const fuelToEthBridgeTxs = ev.data?.filter(({ fromNetwork }) =>
						isFuelChain(fromNetwork),
					);

					const newRefs = fuelToEthBridgeTxs?.reduce((prev, tx) => {
						// safely avoid overriding instance
						if (ctx.fuelToEthTxRefs?.[tx.txHash]) return prev;

						return {
							...prev,
							[tx.txHash]: spawn(
								txFuelToEthMachine.withContext({
									fuelTxId: tx.txHash,
									fuelProvider: ctx.fuelProvider,
									ethPublicClient: ctx.ethPublicClient,
								}),
								{ name: tx.txHash, sync: true },
							),
						};
					}, {});

					return {
						...(ctx.fuelToEthTxRefs || {}),
						...newRefs,
					};
				},
			}),
			assignTxEthToFuel: assign({
				ethToFuelTxRefs: (ctx, ev) => {
					const { ethTxId, fuelAddress, fuelProvider, ethPublicClient } =
						ev.input || {};
					if (!ethTxId || ctx.ethToFuelTxRefs?.[ethTxId])
						return ctx.ethToFuelTxRefs;

					console.log("NEW: creating machine Fuel To Eth: " + ethTxId);
					const newRef = {
						[ethTxId]: spawn(
							txEthToFuelMachine.withContext({
								ethTxId: ethTxId as `0x${string}`,
								fuelAddress: fuelAddress,
								fuelProvider: fuelProvider,
								ethPublicClient: ethPublicClient,
							}),
							{ name: ethTxId, sync: true },
						),
					};

					return {
						...(ctx.ethToFuelTxRefs || {}),
						...newRef,
					};
				},
			}),
			assignTxFuelToEth: assign({
				fuelToEthTxRefs: (ctx, ev) => {
					const { fuelTxId, fuelProvider, ethPublicClient } = ev.input || {};

					if (!fuelTxId || ctx.fuelToEthTxRefs?.[fuelTxId])
						return ctx.fuelToEthTxRefs;

					console.log("NEW: creating machine Fuel To Eth: " + fuelTxId);
					const newRef = {
						[fuelTxId]: spawn(
							txFuelToEthMachine.withContext({
								fuelTxId: fuelTxId as `0x${string}`,
								fuelProvider: fuelProvider,
								ethPublicClient: ethPublicClient,
							}),
							{ name: fuelTxId, sync: true },
						),
					};

					return {
						...(ctx.fuelToEthTxRefs || {}),
						...newRef,
					};
				},
			}),
			assignBridgeTxs: assign((_, ev) => ({
				bridgeTxs: ev.data,
			})),
		},
		services: {
			fetchTxs: FetchMachine.create<
				BridgeInputs["fetchTxs"],
				MachineServices["fetchTxs"]["data"]
			>({
				showError: true,
				maxAttempts: 1,
				async fetch({ input }) {
					if (!input) {
						throw new Error("No input to bridge");
					}

					// Enforce a minimum delay to show the loading state
					// this creates a better experience for the user as the
					// screen doesn't flash between states
					await delay(250);

					const txs = await BridgeService.fetchTxs(input);

					return txs;
				},
			}),
		},
	},
);

export type BridgeTxsMachine = typeof bridgeTxsMachine;
export type BridgeTxsMachineService = InterpreterFrom<BridgeTxsMachine>;
export type BridgeTxsMachineState = StateFrom<BridgeTxsMachine>;
