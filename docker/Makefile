PROFILE ?= all
ENV_FILE ?= ./envs/global.env

build:
	docker compose --profile $(PROFILE) --env-file $(ENV_FILE) build

start:
	docker compose --profile $(PROFILE) --env-file $(ENV_FILE) up -d --build

stop:
	docker compose --profile $(PROFILE) --env-file $(ENV_FILE) stop

restart:
	docker compose --profile $(PROFILE) --env-file $(ENV_FILE) restart

clean:
	docker compose --profile $(PROFILE) --env-file $(ENV_FILE) down --rmi local -v

logs:
	docker compose --profile $(PROFILE) --env-file $(ENV_FILE) logs -f

reset: clean start

