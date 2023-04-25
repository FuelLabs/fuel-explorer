extern crate alloc;
use fuel_indexer_macros::indexer;
use fuel_indexer_plugin::prelude::*;

#[indexer(manifest = "indexer.manifest.yaml")]
pub mod explorer_index {
    fn index_transaction(block_data: BlockData) {
        for tx in block_data.transactions.iter() {
            let mut from: Option<&Address> = None;
            let mut to: Option<&Address> = None;

            match &tx.transaction {
                Transaction::Script(data) => {
                    Logger::info(
                        format!(
                            "(>^‿^)> Inside a script transaction {:?}.",
                            block_data.height
                        )
                        .as_str(),
                    );

                    for input in data.inputs() {
                        from = input.input_owner();
                        if from.is_some() {
                            break;
                        }
                    }
                    for output in data.outputs() {
                        to = output.to();
                        if to.is_some() {
                            break;
                        }
                    }

                    TransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        status: tx.status.clone().into(),
                        age: block_data.time,
                        input_address: Bytes32::new(**from.unwrap()),
                        output_address: Bytes32::new(**to.unwrap()),
                    }
                    .save();
                }
                Transaction::Create(data) => {
                    Logger::info(
                        format!(
                            "<(^.^)> Inside a create transaction {:?}.",
                            block_data.height
                        )
                        .as_str(),
                    );

                    for input in data.inputs() {
                        from = input.input_owner();
                        if from.is_some() {
                            break;
                        }
                    }
                    for output in data.outputs() {
                        to = output.to();
                        if to.is_some() {
                            break;
                        }
                    }

                    TransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        status: tx.status.clone().into(),
                        age: block_data.time,
                        input_address: Bytes32::new(**from.unwrap()),
                        output_address: Bytes32::new(**to.unwrap()),
                    }
                    .save();
                }
                Transaction::Mint(data) => {
                    Logger::info(
                        format!("<(^‿^<) Inside a mint transaction {:?}.", block_data.height)
                            .as_str(),
                    );

                    for output in data.outputs() {
                        to = output.to();
                    }

                    MintTransactionEntity {
                        id: first8_bytes_to_u64(tx.id),
                        age: block_data.time,
                        output_address: Bytes32::new(**to.unwrap()),
                    }
                    .save();
                }
            }
        }
    }
}
