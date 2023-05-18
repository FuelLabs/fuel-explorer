extern crate alloc;
use fuel_indexer_macros::indexer;
use fuel_indexer_plugin::prelude::*;

#[indexer(manifest = "indexer.manifest.yaml")]
pub mod explorer_index {
    fn index_block(block_data: BlockData) {
        let mut transactions: Vec<TransactionEntity> = vec![];
        let block_data_id = first8_bytes_to_u64(block_data.id);

        for tx in block_data.transactions {
            // Logger::info(format!("{:?}", &tx.transaction).as_str());

            let mut transaction_amount = 0;
            let transaction_id = first8_bytes_to_u64(tx.id);
            let mut transaction_status = TxStatus {
                id: transaction_id,
                failure: None,
                squeezed_out: None,
                submitted: None,
                success: None,
            };

            match tx.status {
                TransactionStatus::Failure { time, reason, .. } => {
                    let status = FailureStatus {
                        id: transaction_id,
                        block: block_data_id,
                        reason,
                        timestamp: time.timestamp(),
                    };
                    status.save();
                    transaction_status.failure = Some(status.id);
                }
                TransactionStatus::SqueezedOut { reason } => {
                    let status = SqueezedOutStatus {
                        id: transaction_id,
                        reason,
                    };
                    status.save();
                    transaction_status.squeezed_out = Some(status.id);
                }
                TransactionStatus::Submitted { submitted_at } => {
                    let status = SubmittedStatus {
                        id: transaction_id,
                        timestamp: submitted_at.timestamp(),
                    };
                    status.save();
                    transaction_status.submitted = Some(status.id);
                }
                TransactionStatus::Success { time, .. } => {
                    let status = SuccessStatus {
                        id: transaction_id,
                        block: block_data_id,
                        timestamp: time.timestamp(),
                    };
                    status.save();
                    transaction_status.success = Some(status.id);
                }
            };

            for receipt in tx.receipts {
                match receipt {
                    Receipt::TransferOut {
                        id,
                        to,
                        amount,
                        asset_id,
                        ..
                    } => {
                        transaction_amount += amount;
                        TransferOut {
                            id: first8_bytes_to_u64(bytes32_from_inputs(
                                &id,
                                [id.to_vec(), to.to_vec(), asset_id.to_vec()].concat(),
                            )),
                            contract_id: Bytes32::from(*id),
                            receiver: Bytes32::from(*to),
                            amount,
                            asset_id: Bytes32::from(*asset_id),
                        }
                        .save();
                    }
                    Receipt::MessageOut {
                        message_id,
                        sender,
                        recipient,
                        amount,
                        nonce,
                        len,
                        digest,
                        data,
                    } => {
                        transaction_amount += amount;
                        MessageOut {
                            id: first8_bytes_to_u64(bytes32_from_inputs(
                                &message_id,
                                [
                                    message_id.to_vec(),
                                    sender.to_vec(),
                                    recipient.to_vec(),
                                    nonce.to_vec(),
                                    digest.to_vec(),
                                ]
                                .concat(),
                            )),
                            message_id,
                            sender,
                            recipient,
                            amount,
                            nonce,
                            len,
                            digest,
                            data: Blob::from(data),
                        }
                        .save();
                    }
                    _ => (),
                }
            }

            match tx.transaction {
                Transaction::Script(data) => {
                    let inputs = serde_json::to_string(data.inputs())
                        .expect("Tx Script: Unable to parse inputs");
                    let outputs = serde_json::to_string(data.outputs())
                        .expect("Tx Script: Unable to parse outputs");

                    let transaction = TransactionEntity {
                        id: transaction_id,
                        block_id: block_data_id,
                        hash: tx.id,
                        value: transaction_amount,
                        status: Some(transaction_status.id),
                        age: block_data.time,
                        inputs: Some(Json(inputs)),
                        outputs: Json(outputs),
                    };

                    transaction.save();
                    transactions.push(transaction);
                }
                Transaction::Create(data) => {
                    let inputs = serde_json::to_string(data.inputs())
                        .expect("Tx Create: Unable to parse inputs");
                    let outputs = serde_json::to_string(data.outputs())
                        .expect("Tx Create: Unable to parse outputs");

                    let transaction = TransactionEntity {
                        id: transaction_id,
                        block_id: block_data_id,
                        hash: tx.id,
                        value: transaction_amount,
                        status: Some(transaction_status.id),
                        age: block_data.time,
                        inputs: Some(Json(inputs)),
                        outputs: Json(outputs),
                    };

                    transaction.save();
                    transactions.push(transaction);
                }
                Transaction::Mint(data) => {
                    let outputs = serde_json::to_string(data.outputs())
                        .expect("Tx Mint: Unable to parse outputs");

                    let transaction = TransactionEntity {
                        id: transaction_id,
                        block_id: block_data_id,
                        hash: tx.id,
                        value: transaction_amount,
                        status: None,
                        age: block_data.time,
                        inputs: None,
                        outputs: Json(outputs),
                    };

                    transaction.save();
                    transactions.push(transaction);
                }
            }
        }

        let header = Header {
            id: block_data_id,
            hash: block_data.id,
            height: block_data.height,
            // TODO: Calculate merkle root of transactions, should be implementable right now
            merkle_root: Bytes32::zeroed(),
            // TODO: when querying is possible get the genesis block or the previous block
            previous_block_hash: Bytes32::zeroed(),
            timestamp: block_data.time,
        };

        let auxillary = Auxillary {
            id: block_data_id,
            data_availability_height: 0,
            transactions_count: 0,
            message_receipt_count: 0,
            message_receipt_root: Bytes32::zeroed(),
            application_hash: Bytes32::zeroed(),
        };

        let signature = Signature { id: block_data_id };

        let poa = PoAConsensus {
            id: block_data_id,
            signature: signature.id,
        };

        let consensus = Consensus {
            id: block_data_id,
            genesis: None,
            poa: Some(poa.id),
        };

        let block = Block {
            id: block_data_id,
            header: header.id,
            auxillary: auxillary.id,
            producer: block_data.producer,
            consensus: consensus.id,
            // TODO: storing arrays is unimplemented
            // transactions: [Transaction]
        };

        block.save();
    }
}
