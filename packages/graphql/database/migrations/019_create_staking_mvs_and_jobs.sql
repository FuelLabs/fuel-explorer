-- daily_staked_mv
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.daily_staked_mv AS
SELECT
   DATE_TRUNC('day', t."timestamp") AS day,
    SUM(CAST(r.receipt_amount AS BIGINT)) AS daily_staked
FROM
    indexer.transactions_accounts ta
JOIN
    indexer.transactions t
    ON ta.tx_hash = t.tx_hash
    AND t."timestamp" > (NOW() - INTERVAL '60 days')
    AND t."data"->>'scriptData' LIKE '%76465706f736974%'
JOIN
    indexer.receipts r
    ON r.tx_hash = t.tx_hash
    AND r.receipt_type = 'CALL'
    AND r.receipt_to = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
    AND CAST(r.receipt_amount AS BIGINT) > 0
WHERE
    ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY
    day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS daily_staked_mv_day_idx ON indexer.daily_staked_mv(day);
GRANT SELECT ON indexer.daily_staked_mv TO explorer_ro;

-- daily_unbond_mv
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.daily_unbond_mv AS
SELECT
    DATE_TRUNC('day', t."timestamp") AS day,
    SUM(CAST(r.receipt_amount AS BIGINT)) AS daily_unbond
FROM
    indexer.transactions_accounts ta
JOIN
    indexer.transactions t
    on ta.tx_hash = t.tx_hash
    and t."timestamp" > (now() - INTERVAL '60 days')
    and t."data"->>'scriptData' like '%87769746864726177%'
JOIN
    indexer.receipts r
    on r.tx_hash = ta.tx_hash
    and r.receipt_type = 'TRANSFER_OUT'
    and r.receipt_asset_id = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82'
    and CAST(r.receipt_amount AS BIGINT) > 0
WHERE
    ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY
    day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS daily_unbond_mv_day_idx ON indexer.daily_unbond_mv(day);
GRANT SELECT ON indexer.daily_unbond_mv TO explorer_ro;

-- total_staking_mv
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.total_staking_mv AS
SELECT
    l1.day AS day,
    (l1.daily_staked + l2.daily_staked) AS daily_staked
FROM (
    SELECT
        DATE_TRUNC('day', cr."timestamp") AS day,
        SUM(CAST(regexp_replace(ce2.value, '[^0-9]', '', 'g') AS BIGINT)) AS daily_staked
    FROM
        indexer.cosmos_responses cr
    LEFT JOIN
        indexer.cosmos_events ce
        ON ce.cosmos_response_id = cr._id
        AND ce."type" = 'delegate'
        AND ce."key" = 'delegator'
        AND ce."value" != '0x85308a35b3ad660213ea91a5d37bbf9620708ecc'
    JOIN
        indexer.cosmos_events ce2
        ON ce2.cosmos_response_id = cr._id
        AND ce2."type" = 'delegate'
        AND ce2."key" = 'amount'
        AND ce2."index" = ce."index"
    WHERE
        cr."timestamp" > (now() - INTERVAL '60 days')
    GROUP BY
        day
) l1
JOIN (
    SELECT
        DATE_TRUNC('day', t."timestamp") AS day,
        SUM(CAST(r.receipt_amount AS BIGINT)) AS daily_staked
    FROM
        indexer.transactions_accounts ta
    JOIN
        indexer.transactions t
        ON ta.tx_hash = t.tx_hash
        AND t."timestamp" > (now() - INTERVAL '60 days')
        AND t."data"->>'scriptData' LIKE '%76465706f736974%'
    JOIN
        indexer.receipts r
        ON r.tx_hash = ta.tx_hash
        AND r.receipt_type = 'CALL'
        AND r.receipt_to = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
        AND CAST(r.receipt_amount AS BIGINT) > 0
    WHERE
        ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
    GROUP BY
        day
) l2
ON l2.day = l1.day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS total_staking_mv_day_idx ON indexer.total_staking_mv(day);
GRANT SELECT ON indexer.total_staking_mv TO explorer_ro;

-- daily_claims_mv
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.daily_claims_mv AS
SELECT
	DATE_TRUNC('day', t."timestamp") AS day,
    (SUM(CAST(r.receipt_amount AS BIGINT)) / 1000000000) AS daily_claims
FROM
	indexer.transactions_accounts ta
JOIN
	indexer.transactions t
	on ta.tx_hash = t.tx_hash
    and t."timestamp" > (now() - INTERVAL '60 days')
    and t."data"->>'scriptData' like '%d636c61696d5f72657761726473%'
JOIN
	indexer.receipts r
	on r.tx_hash = ta.tx_hash
	and r.receipt_type = 'TRANSFER_OUT'
	and r.receipt_asset_id = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82'
	and CAST(r.receipt_amount AS BIGINT) > 0
WHERE
	ta.account_hash = '0x095faac82412324c60fdf6934405b5df9de49982284779536218d16d5ee3dc4c'
GROUP BY
    day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS daily_claims_mv_day_idx ON indexer.daily_claims_mv(day);
GRANT SELECT ON indexer.daily_claims_mv TO explorer_ro;

-- inflows_mv
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.inflows_mv AS
select 
	sum((i.data->>'amount')::numeric) as amount, 
	DATE_TRUNC('day', t."timestamp") as day
from 
	indexer.transactions_accounts a 
	join indexer.transactions t on (a.tx_hash = t.tx_hash) 
	join indexer.outputs i on (i.transaction_id = t._id) 
where 
	account_hash in ('0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601', '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2')
	and i.data->>'assetId' = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82' 
	and i.data->>'to' not in ('0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601', '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2')
	and i.data->>'__typename' = 'CoinOutput'
group by day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS inflows_mv_day_idx ON indexer.inflows_mv(day);
GRANT SELECT ON indexer.inflows_mv TO explorer_ro;

-- outflows_mv
CREATE MATERIALIZED VIEW IF NOT EXISTS indexer.outflows_mv AS
select 
	sum((i.data->>'amount')::numeric) as amount, 
	DATE_TRUNC('day', t."timestamp") as day
from 
	indexer.transactions_accounts a 
	join indexer.transactions t on (a.tx_hash = t.tx_hash) 
	join indexer.outputs i on (i.transaction_id = t._id) 
where 
	account_hash in ('0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601', '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2')
	and i.data->>'assetId' = '0x1d5d97005e41cae2187a895fd8eab0506111e0e2f3331cd3912c15c24e3c1d82' 
	and i.data->>'to' in ('0xdb491b442f68ebaa785f077805158ebfddeede7063f16d5a26e1073ff6987601', '0xafdda1cd084ed0f56d35f570b2e9d34e7c7380191058e2a2fb16e0c58cbbc7c2')
	and i.data->>'__typename' = 'CoinOutput'
group by day
WITH DATA;

CREATE UNIQUE INDEX IF NOT EXISTS outflows_mv_day_idx ON indexer.outflows_mv(day);
GRANT SELECT ON indexer.outflows_mv TO explorer_ro;

-- database_jobs table
create table if not exists indexer.database_jobs (
    _id serial,
    query text UNIQUE,
    recurrent boolean not null default FALSE,
    interval_seconds integer,
    status text,
    last_run TIMESTAMPTZ,
    error_message text
);

insert into indexer.database_jobs (query, recurrent, interval_seconds, status) values ('REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_staked_mv', true, 86400, 'pending') on conflict (query) do nothing;
insert into indexer.database_jobs (query, recurrent, interval_seconds, status) values ('REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_unbond_mv', true, 86400, 'pending') on conflict (query) do nothing;
insert into indexer.database_jobs (query, recurrent, interval_seconds, status) values ('REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.total_staking_mv', true, 86400, 'pending') on conflict (query) do nothing;
insert into indexer.database_jobs (query, recurrent, interval_seconds, status) values ('REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.daily_claims_mv', true, 86400, 'pending') on conflict (query) do nothing;
insert into indexer.database_jobs (query, recurrent, interval_seconds, status) values ('REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.inflows_mv', true, 86400, 'pending') on conflict (query) do nothing;
insert into indexer.database_jobs (query, recurrent, interval_seconds, status) values ('REFRESH MATERIALIZED VIEW CONCURRENTLY indexer.outflows_mv', true, 86400, 'pending') on conflict (query) do nothing;
