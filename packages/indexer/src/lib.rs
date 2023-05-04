extern crate alloc;
use fuel_indexer_macros::indexer;
use fuel_indexer_plugin::prelude::*;

#[indexer(manifest = "indexer.manifest.yaml")]
pub mod explorer_index {
    fn index_block(block_data: BlockData) {
        // TODO: fetch Tx from block and index

        Block {
            id: first8_bytes_to_u64(block_data.id),
            previous_root: Bytes32::zeroed(),
            height: block_data.height,
            timestamp: block_data.time,
            // transactions: vec![],
        }
        .save();
    }
}
