// TODO: this file should be completely removed once the fuel sdk start returning whole header data

const blockQuery = `query blockQuery($id: BlockId, $height: U64) {
  block(id: $id, height: $height) {
    id
    header {
      prevRoot
      transactionsCount
      applicationHash
      transactionsRoot
      height
      daHeight
      transactionsCount
      messageOutboxRoot
      messageReceiptCount
      transactionsRoot
      height
      prevRoot
      time
      id
    }
  }
}
`;
export interface Block {
  id: string;
  header: Header;
}

export interface Header {
  prevRoot: string;
  transactionsCount: string;
  applicationHash: string;
  transactionsRoot: string;
  height: string;
  daHeight: string;
  messageOutboxRoot: string;
  messageReceiptCount: string;
  time: string;
  id: string;
}

export async function getBlock({
  blockHash,
  providerUrl,
  height,
}: {
  blockHash?: string;
  providerUrl: string;
  height?: string;
}): Promise<Block> {
  const variables: Record<string, any> = {};
  if (height) {
    variables.height = height;
  } else {
    variables.id = blockHash;
  }
  const response = await fetch(providerUrl, {
    method: 'POST',
    body: JSON.stringify({
      query: blockQuery,
      variables: {
        id: blockHash,
        height,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return response.data.block;
}
