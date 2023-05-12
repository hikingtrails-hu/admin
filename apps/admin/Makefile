BIN=$(TURBO_INVOCATION_DIR)/node_modules/.bin
REMIX=$(BIN)/remix

export

build:
	$(REMIX) build

dev:
	$(BIN)/concurrently \
		-n remix,worker \
		"$(REMIX) dev --port 3100" \
		"$(BIN)/nodemon" \

node_modules: package.json yarn.lock
	yarn install --immutable
	touch node_modules

format: node_modules
	$(BIN)/prettier --write .

lint: node_modules
	$(BIN)/prettier --check .
	#$(TURBO) run lint

#deploy: node_modules
#	$(DOTENV) -e .env.global -e .env -- $(TURBO) run deploy

typecheck: node_modules
	$(TURBO) run typecheck


verify: lint typecheck
#	$(DOTENV) -e .env.global -e .env -- $(TURBO) run typecheck test

docker:
	docker-compose up -d

init: .env docker

#.env:
#	cp .env.example .env
