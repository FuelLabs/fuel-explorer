import { DateHelper } from '~/core/Date';

export default class Transaction {
  id: string;
  transactionHash: string;
  timestamp: Date;
  data: any;
  blockId: number;

  constructor(data: any, index: number, blockId: number) {
    const height = String(blockId).padStart(32, '0');
    const indexStr = (index + 1).toString().padStart(16, '0');
    this.id = `${height}-${indexStr}`;
    this.transactionHash = data.id;
    this.timestamp = data.status?.time
      ? DateHelper.tai64toDate(data.status.time).toDate()
      : new Date();
    this.data = data;
    this.blockId = blockId;
  }
}
