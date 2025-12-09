create table if not exists indexer.receipts (
    _id serial primary key,
    block_id integer,
    transaction_id text, 
    tx_hash text,
    indent int,
    receipt_amount text,
    receipt_asset_id text,
    receipt_contract_id text,
    receipt_data text,
    receipt_digest text,
    receipt_gas text,
    receipt_gas_used text,
    receipt_id text,
    receipt_is text,
    receipt_len text,
    receipt_nonce text,
    receipt_param1 text,
    receipt_param2 text,
    receipt_pc text,
    receipt_ptr text,
    receipt_ra text,
    receipt_rb text,
    receipt_rc text,
    receipt_rd text,
    receipt_reason text,
    receipt_type text,
    receipt_recipient text,
    receipt_result text,
    receipt_sender text,
    receipt_sub_id text,
    receipt_to text,
    receipt_to_address text,
    receipt_val text
);

create index if not exists receipts_tx_hash_idx on indexer.receipts (tx_hash);
create index if not exists receipts_transaction_id_idx on indexer.receipts (transaction_id);
create index if not exists receipts_block_id_idx on indexer.receipts (block_id);
create index if not exists receipts_receipt_type_idx on indexer.receipts (receipt_type);

create table if not exists indexer.receipts_data (
    _id serial primary key,
    receipt_id int,
    key text,
    value text
);

create index if not exists receipts_data_key_idx on indexer.receipts_data (key);
create index if not exists receipts_data_value_idx on indexer.receipts_data (value);
