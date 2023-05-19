extern crate alloc;
use fuel_indexer_macros::indexer;
use fuel_indexer_plugin::prelude::*;

#[indexer(manifest = "indexer.manifest.yaml")]
pub mod indexer_index_mod {
    fn index_explorer_data(block_data: BlockData) {
        let producer = block_data.producer.unwrap_or(Bytes32::zeroed());

        let block = Block {
            id: first8_bytes_to_u64(block_data.id),
            height: block_data.height,
            producer,
            hash: block_data.id,
            timestamp: block_data.time,
        };
        block.save();

        Logger::info(format!("{:?}", block).as_str());
    }
}
