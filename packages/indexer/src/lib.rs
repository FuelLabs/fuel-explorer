extern crate alloc;
use fuel_indexer_macros::indexer;
use fuel_indexer_plugin::prelude::*;

#[indexer(manifest = "indexer.manifest.yaml")]
pub mod explorer_index {
    fn index_transaction(block_data: BlockData) {
        // Logger::info(format!("{:?}", &block_data).as_str());

        for tx in block_data.transactions.iter() {

            let mut from: Option<&Address> = None;
            let mut to: Option<&Address> = None;
            
            match &tx.transaction {
                #[allow(unused)]
                Transaction::Script(data) => {
                    // Logger::info("Inside a script transaction. (>^‿^)>");
                    for input in data.inputs() {
                        from = input.input_owner();
                    }
                    for output in data.outputs() {
                        to = output.to();
                    }

                    let tx_entity = ScriptTx {
                        id: first8_bytes_to_u64(tx.id),
                        status: tx.status.clone().into(),
                        age: block_data.time,
                        from: Bytes32::new(**from.unwrap()),
                        to: Bytes32::new(**to.unwrap())
                    };
        
                    tx_entity.save();
                }
                #[allow(unused)]
                Transaction::Create(data) => {
                    // Logger::info("Inside a create transaction. <(^.^)>");

                    for input in data.inputs() {
                        from = input.input_owner();
                    }
                    for output in data.outputs() {
                        to = output.to();
                    }

                    let tx_entity = CreateTx {
                        id: first8_bytes_to_u64(tx.id),
                        status: tx.status.clone().into(),
                        age: block_data.time,
                        from: Bytes32::new(**from.unwrap()),
                        to: Bytes32::new(**to.unwrap())
                    };
        
                    tx_entity.save();
                }
                #[allow(unused)]
                Transaction::Mint(data) => {
                    // Logger::info("Inside a mint transaction. <(^‿^<)");

                    let tx_pointer = data.tx_pointer();
                    let outputs = data.outputs();

                    for output in data.outputs() {
                        to = output.to();
                    }

                    let tx_entity = MintTx {
                        id: first8_bytes_to_u64(tx.id),
                        age: block_data.time,
                        to: Bytes32::new(**to.unwrap())
                    };

                    tx_entity.save();
                }
            }
        }
    }
}
