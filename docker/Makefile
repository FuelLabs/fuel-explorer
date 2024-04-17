build:
	docker compose --env-file ./envs/ports.env build

start:
	docker compose --env-file ./envs/ports.env up -d --build

stop:
	docker compose stop

clean:
	docker compose down --rmi local -v

logs:
	docker compose logs -f

dump-db:
	docker compose exec fuel-explorer-pgsql pg_dump -U postgres -d postgres > ../packages/graphql/db/dev_dump.sql

restore-db:
	docker compose exec fuel-explorer-pgsql psql -U postgres -d postgres < ../packages/graphql/db/dev_dump.sql
