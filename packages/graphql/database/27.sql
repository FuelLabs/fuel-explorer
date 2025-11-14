-- Add VACUUM ANALYZE maintenance jobs for database optimization
-- These jobs reclaim dead rows, update statistics, and improve query planner decisions

-- Hot tables (frequently updated during indexing) - run daily
insert into indexer.database_jobs (query, recurrent, interval_seconds, status)
values ('VACUUM ANALYZE indexer.transactions', true, 86400, 'pending');

insert into indexer.database_jobs (query, recurrent, interval_seconds, status)
values ('VACUUM ANALYZE indexer.transactions_accounts', true, 86400, 'pending');

insert into indexer.database_jobs (query, recurrent, interval_seconds, status)
values ('VACUUM ANALYZE indexer.contracts', true, 86400, 'pending');

-- Less frequently updated tables - run weekly
insert into indexer.database_jobs (query, recurrent, interval_seconds, status)
values ('VACUUM ANALYZE indexer.blocks', true, 604800, 'pending');

insert into indexer.database_jobs (query, recurrent, interval_seconds, status)
values ('VACUUM ANALYZE indexer.outputs', true, 604800, 'pending');

insert into indexer.database_jobs (query, recurrent, interval_seconds, status)
values ('VACUUM ANALYZE indexer.inputs', true, 604800, 'pending');

insert into indexer.database_jobs (query, recurrent, interval_seconds, status)
values ('VACUUM ANALYZE indexer.predicates', true, 604800, 'pending');
