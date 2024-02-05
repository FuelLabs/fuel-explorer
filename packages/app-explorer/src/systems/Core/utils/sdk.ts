import { resolve } from "url";
import { getSdk } from "@fuel-explorer/graphql";
import { GraphQLClient } from "graphql-request";

const VERCEL_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
const VERCEL_ENV =
	process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || "development";

const getBaseUrl = () => {
	if (VERCEL_ENV !== "development") return `https://${VERCEL_URL}`;
	return "http://localhost:3000";
};

const API_URL = resolve(getBaseUrl(), "/api/graphql");
const client = new GraphQLClient(API_URL, { fetch });
export const sdk = getSdk(client);
