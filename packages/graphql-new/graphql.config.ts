import dotenv from 'dotenv';
import type { IGraphQLConfig } from 'graphql-config';
dotenv.config();

const SERVER_URL = process.env.FUEL_PROVIDER || 'http://127.0.0.1:4000/graphql';

const config: IGraphQLConfig = {
  schema: SERVER_URL,
  documents: ['./src/domain/**/*.graphql'],
};

export default config;
