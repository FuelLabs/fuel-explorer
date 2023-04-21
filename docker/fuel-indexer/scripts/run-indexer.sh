echo "Start fuel-indexer";
sleep 2;
echo "Running fuel-indexer";
./fuel-indexer run \
--fuel-node-host fuel-explorer-core \
--fuel-node-port 4000 \
--postgres-host fuel-explorer-pgsql \
--postgres-password postgres \
--graphql-api-host 0.0.0.0 \
--run-migrations

# We should be using a config file here but the current
# when executing it the graphql api host is not being set
# correctly. So we are using the command line arguments.
# TODO: Use config file to run fuel-indexer
# ./fuel-indexer run --config /usr/local/config.yaml