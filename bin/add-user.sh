#!/usr/bin/env sh

if [ -f node_modules/.bin/alias-hq ]
then
    # Development mode
    node_modules/.bin/ts-node -r alias-hq/init -e "require('dotenv').config(); const { addUser } = require('./src/cli').cli; void addUser()" "$@"
else
    # Production mode
    node -e "require('dotenv').config(); void require('./build/index.js').routes.root.module.cli.addUser()" "$@"
fi
