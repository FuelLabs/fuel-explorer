extern crate alloc;
use fuel_indexer_macros::indexer;
use fuel_indexer_plugin::prelude::*;
use serde_json::Value;

#[indexer(manifest = "indexer.manifest.yaml")]
pub mod explorer_index {
    fn index_block(block_data: BlockData) {
        let mut transactions: Vec<TransactionEntity> = vec![];

        for tx in block_data.transactions.iter() {
            // Logger::info(format!("{:?}", &tx.transaction).as_str());

            match &tx.transaction {
                Transaction::Script(data) => {
                    let inputs: Value = serde_json::to_string(&data.inputs()).unwrap().into();

                    let transaction = TransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        status: Some(tx.status.clone().into()),
                        age: block_data.time,
                        inputs: Some(Json(inputs.to_string())),
                        outputs: Json(serde_json::to_value(data.outputs()).unwrap().to_string()),
                    };

                    transaction.save();
                    transactions.push(transaction);
                }
                Transaction::Create(data) => {
                    let inputs: Value = serde_json::to_string(&data.inputs()).unwrap().into();

                    let transaction = TransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        status: Some(tx.status.clone().into()),
                        age: block_data.time,
                        inputs: Some(Json(inputs.to_string())),
                        outputs: Json(serde_json::to_value(data.outputs()).unwrap().to_string()),
                    };

                    transaction.save();
                    transactions.push(transaction);
                }
                Transaction::Mint(data) => {
                    let transaction = TransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        status: None,
                        age: block_data.time,
                        inputs: None,
                        outputs: Json(serde_json::to_value(data.outputs()).unwrap().to_string()),
                    };

                    transaction.save();
                    transactions.push(transaction);
                }
            }
        }

        Block {
            id: first8_bytes_to_u64(block_data.id),
            previous_root: Bytes32::zeroed(),
            height: block_data.height,
            timestamp: block_data.time,
            // transactions: transactions,
        }
        .save();
    }
}
