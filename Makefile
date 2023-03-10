.PHONY: dev test depcheck format-code lint verify dev init-remix-app app-dev remix-dev init tsnode

ifneq (,$(wildcard ./.env))
    include .env
    export
endif

BIN=node_modules/.bin
PRETTIER=$(BIN)/prettier
TSC=$(BIN)/tsc
REMIX=$(BIN)/remix
TSNODE=$(BIN)/ts-node -r alias-hq/init

default: build

node_modules: package.json yarn.lock
	yarn --frozen-lockfile
	touch node_modules

format-code: node_modules
	$(PRETTIER) --write .

lint: node_modules
	$(PRETTIER) --check .

depcheck: node_modules
	#$(BIN)/depcheck

verify: depcheck lint #check-types #test

#test: node_modules
#	$(BIN)/jest --coverage

check-types: node_modules
	$(TSC) -p . --noEmit

dev: node_modules
	$(REMIX) dev

#while true; do $(REMIX) dev; echo 1; done

build: node_modules
	NODE_ENV=production $(REMIX) build
	$(BIN)/gulp licenses

.env: .env.development
	cp .env.development .env

init: .env node_modules

production-deps:
	yarn --frozen-lockfile --production
