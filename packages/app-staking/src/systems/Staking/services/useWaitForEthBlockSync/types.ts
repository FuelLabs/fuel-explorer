export type CometBlockSyncEventMessage = {
  jsonrpc: '2.0';
  id: number;
  result: {
    query: string;
    data: {
      type: 'tendermint/event/Tx';
      value: {
        TxResult: {
          height: string;
          tx: string;
          result: {
            data: string;
            gas_wanted: string;
            gas_used: string;
            events: Array<{
              type: string;
              attributes: Array<{
                key: string;
                value: string;
                index: boolean;
              }>;
            }>;
          };
        };
      };
    };
    events: {
      [key: string]: string[];
    };
  };
};
