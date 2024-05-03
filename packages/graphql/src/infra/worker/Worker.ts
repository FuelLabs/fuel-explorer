import path from 'node:path';
import { runTransactionsWorker } from '~/application/uc/RunTransactionsWorker';

export const workerFilepath = path.resolve(__filename);
export default runTransactionsWorker;
