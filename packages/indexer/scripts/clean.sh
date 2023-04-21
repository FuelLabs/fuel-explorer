#!/bin/bash

# This query cleans alls tables from the indexer_indexer schema
SQL_COMMAND=$(cat <<EOF
    DO \$\$ DECLARE
        tname text;
        sname text;
    BEGIN
        FOR tname, sname IN
            SELECT tables.table_name, tables.table_schema FROM information_schema.tables AS tables
            WHERE tables.table_schema = 'public'
            AND tables.table_name like 'graph_registry%'
            AND tables.table_type = 'BASE TABLE'
        LOOP
            EXECUTE 'DELETE FROM ' || sname || '.' || tname || ';';
        END LOOP;
    END \$\$;
    DROP SCHEMA IF EXISTS indexer_indexer CASCADE;
    
EOF
)

echo "📦 Cleaning all tables from Indexer"
docker exec -t fuel-explorer-pgsql psql -U postgres -c "$SQL_COMMAND"

echo "🔄 Restart fuel-explorer-indexer container"
docker restart fuel-explorer-indexer

echo "⚠️ Restart the 'pnpm dev:indexer' to start indexing"