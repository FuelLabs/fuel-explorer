extern crate alloc;
use fuel_indexer_macros::indexer;
use fuel_indexer_plugin::prelude::*;

#[indexer(manifest = "indexer.manifest.yaml")]
pub mod explorer_index {
    fn index_block(block_data: BlockData) {
        let mut header = Header {
            id: first8_bytes_to_u64(block_data.id),
            transaction_count: 0,
            output_message_count: 0,
            transactions_root: Bytes32::zeroed(),
            height: block_data.height,
            previous_root: Bytes32::zeroed(),
            timestamp: block_data.time,
            application_hash: Bytes32::zeroed(),
        };

        for tx in block_data.transactions.iter() {
            header.transaction_count += 1;

            for receipt in &tx.receipts {
                match receipt {
                    Receipt::MessageOut { .. } => {
                        header.output_message_count += 1;
                    }
                    _ => (),
                }
            }
        }

        Block {
            id: first8_bytes_to_u64(block_data.id),
            header,
        }
        .save();
    }
}
