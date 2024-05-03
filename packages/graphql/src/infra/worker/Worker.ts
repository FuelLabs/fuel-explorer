import path from 'node:path';
import { runTransactionWorker } from '~/application/uc/RunTransactionWorker';

export const workerFilepath = path.resolve(__filename);
export default runTransactionWorker;
