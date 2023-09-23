start:
	# sh ./scripts/start.sh
	# docker compose up
	echo "Docker env is temporary disabled on this project";
	echo "Run pnpm dev for development";

down:
	docker compose down

restart:
	docker compose restart

clean:
	docker compose down --rmi local -v --remove-orphans

logs:
	docker compose logs -f
