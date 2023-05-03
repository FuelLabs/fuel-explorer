extern crate alloc;
use fuel_indexer_macros::indexer;
use fuel_indexer_plugin::prelude::*;
use serde_json::Value;

#[indexer(manifest = "indexer.manifest.yaml")]
pub mod explorer_index {

    fn index_transaction(block_data: BlockData) {
        for tx in block_data.transactions.iter() {
            // Logger::info(format!("{:?}", &tx.transaction).as_str());

            match &tx.transaction {
                Transaction::Script(data) => {
                    // Logger::info(
                    //     format!(
                    //         "(>^‿^)> Inside a script transaction {:?}.",
                    //         block_data.height
                    //     )
                    //     .as_str(),
                    // );

                    let inputs: Value = serde_json::to_string(&data.inputs()).unwrap().into();

                    TransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        status: Some(tx.status.clone().into()),
                        age: block_data.time,
                        inputs: Some(Json(inputs.to_string())),
                        outputs: Json(serde_json::to_value(data.outputs()).unwrap().to_string()),
                    }
                    .save();
                }
                Transaction::Create(data) => {
                    // Logger::info(
                    //     format!(
                    //         "<(^.^)> Inside a create transaction {:?}.",
                    //         block_data.height
                    //     )
                    //     .as_str(),
                    // );

                    let inputs: Value = serde_json::to_string(&data.inputs()).unwrap().into();

                    TransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        status: Some(tx.status.clone().into()),
                        age: block_data.time,
                        inputs: Some(Json(inputs.to_string())),
                        outputs: Json(serde_json::to_value(data.outputs()).unwrap().to_string()),
                    }
                    .save();
                }
                Transaction::Mint(data) => {
                    // Logger::info(
                    //     format!("<(^‿^<) Inside a mint transaction {:?}.", block_data.height)
                    //         .as_str(),
                    // );

                    TransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        status: None,
                        age: block_data.time,
                        inputs: None,
                        outputs: Json(serde_json::to_value(data.outputs()).unwrap().to_string()),
                    }
                    .save();
                }
            }
        }
    }
}
