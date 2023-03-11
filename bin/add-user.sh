#!/usr/bin/env sh

if [ -f ./.env ]
then
    export $(cat ./.env | xargs)
fi

if [ -f node_modules/.bin/alias-hq ]
then
    # Development mode
    node_modules/.bin/ts-node -r alias-hq/init -e "const { addUser } = require('./src/cli').cli; void addUser()" -- "$@"
else
    # Production mode
    node -e "void require('./build/index.js').routes.root.module.cli.addUser()" "$@"
fi
