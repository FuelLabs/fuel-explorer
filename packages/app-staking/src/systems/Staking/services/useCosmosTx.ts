import { useQuery } from '@tanstack/react-query';
import { cosmosApi } from '~staking/systems/Core/utils/api';
import { QUERY_KEYS } from '~staking/systems/Core/utils/query';

export const useCosmosTx = (txHash: string | undefined) => {
  const query = useQuery({
    queryKey: QUERY_KEYS.cosmosTx(txHash),
    queryFn: async () => {
      const response = await cosmosApi.get<GetTxResponse>(
        `/cosmos/tx/v1beta1/txs/${txHash}`,
      );
      return response;
    },
    enabled: !!txHash && !txHash?.startsWith('0x'),
    meta: {
      persist: true,
      cacheTime: 1000 * 60 * 60 * 24 * 2, // 2 days
    },
  });

  return query;
};

interface GetTxResponse {
  tx: {
    body: {
      messages: any[];
      memo: string;
      timeout_height: string;
      extension_options: any[];
      non_critical_extension_options: any[];
    };
    auth_info: {
      signer_infos: {
        public_key: { type_url: string; value: string };
        mode_info: {
          single:
            | { mode: string }
            | {
                multi: {
                  bitarray: { extra_bits_stored: number; elems: string };
                  mode_infos: {
                    single:
                      | { mode: string }
                      | {
                          multi: {
                            bitarray: {
                              extra_bits_stored: number;
                              elems: string;
                            };
                            mode_infos: any[];
                          };
                        }[];
                  };
                };
              };
        };
        sequence: string;
      }[];
      fee: {
        amount: { denom: string; amount: string }[];
        gas_limit: string;
        payer: string;
        granter: string;
      };
    };
    signatures: string[];
  };
  tx_response: {
    height: string;
    txhash: string;
    codespace: string;
    code: number;
    data: string;
    raw_log: string;
    logs: {
      msg_index: number;
      log: string;
      events: { type: string; attributes: { key: string; value: string }[] }[];
    }[];
    info: string;
    gas_wanted: string;
    gas_used: string;
    tx: any;
    timestamp: string;
  };
}
