.PHONY: dev test build down stop logs bash delete-universe

d: dev
la: logs

# Garante que o .env existe antes de tudo
start-setup:
	@if [ ! -f .env ]; then cp .env.example .env; fi

dev: start-setup
	@docker compose -f ./docker/docker-compose.dev.yml up -d

build: start-setup
	@docker compose -f ./docker/docker-compose.dev.yml down --remove-orphans --volumes
	@docker compose -f ./docker/docker-compose.dev.yml build --no-cache
	@docker compose -f ./docker/docker-compose.dev.yml up -d --force-recreate

down:
	@docker compose -f ./docker/docker-compose.dev.yml down --remove-orphans --volumes
	@docker compose -f ./docker/docker-compose.test.yml down --remove-orphans --volumes

stop:
	@docker compose -f ./docker/docker-compose.dev.yml stop
	@docker compose -f ./docker/docker-compose.test.yml stop

bash:
	@docker exec -it valorant-tips-web /bin/sh

log: logs

logs:
	@docker compose -f ./docker/docker-compose.dev.yml logs -f valorant-tips-web

# Testing

build-test: start-setup
	@docker compose -f ./docker/docker-compose.test.yml down --remove-orphans --volumes
	@docker volume prune -f
	@docker compose -f ./docker/docker-compose.test.yml build

test: start-setup build-test
	@docker compose -f ./docker/docker-compose.test.yml run valorant-tips-test pnpm test
	@docker compose -f ./docker/docker-compose.test.yml rm -f -s -v valorant-tips-test

test-e2e: start-setup build-test
	@docker compose -f ./docker/docker-compose.test.yml run valorant-tips-test pnpm test:e2e
	@docker compose -f ./docker/docker-compose.test.yml rm -f -s -v valorant-tips-test

test-a11y: start-setup build-test
	@docker compose -f ./docker/docker-compose.test.yml run valorant-tips-test pnpm exec playwright test --grep @a11y
	@docker compose -f ./docker/docker-compose.test.yml rm -f -s -v valorant-tips-test

test-bdd: start-setup build-test
	@docker compose -f ./docker/docker-compose.test.yml run valorant-tips-test pnpm test:bdd
	@docker compose -f ./docker/docker-compose.test.yml rm -f -s -v valorant-tips-test

test-bash: start-setup build-test
	@docker compose -f ./docker/docker-compose.test.yml run valorant-tips-test /bin/bash

# Cleaning

delete-universe:
	@make down && make delete-all-containers && make delete-all-networks && make delete-all-volumes && make delete-all-images && make delete-all-unsed-images && pnpm cache clean

delete-all-unsed-images:
	@docker image prune -a -f

status:
	@docker stats

delete-all-containers:
	@docker ps -aq | xargs -r docker rm -f

delete-all-networks:
	@docker network ls -q | grep -v -e "bridge" -e "host" -e "none" | xargs -r docker network rm

delete-all-volumes:
	@docker volume ls -q | xargs -r docker volume rm

delete-all-images:
	@docker images -q | xargs -r docker rmi -f
