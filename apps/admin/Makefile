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
