BIN=node_modules/.bin
TURBO=$(BIN)/turbo
TSNODE=${BIN}/ts-node --transpile-only --swc -r alias-hq/init

export

default: build .dockerignore

build: node_modules
	$(TURBO) run build

dev: node_modules docker
	$(TURBO) run dev

node_modules:
	yarn install --immutable
	touch node_modules

format: node_modules
	$(BIN)/prettier --write .

lint: node_modules
	$(BIN)/prettier --check .
	#$(TURBO) run lint

production-deps:
	yarn workspaces focus --all --production

typecheck: node_modules
	$(TURBO) run typecheck

verify: lint typecheck

docker:
	docker-compose up -d

.dockerignore: node_modules .gitignore
	$(BIN)/npmignore -n .dockerignore \
		-i .git,.yarn \
		-u dist,.cache,dist,node_modules,/.gcloud/*

init: .env docker

.env:
	cp .env.example .env

.gcloud/hikingtrails-runtime-service-account-key.json:
	echo $(GCLOUD_RUNTIME_SERVICE_ACCOUNT) | base64 --decode > .gcloud/hikingtrails-runtime-service-account-key.json
