#!/usr/bin/env sh

set -e

echo "$GCLOUD_RUNTIME_SERVICE_ACCOUNT" | base64 --decode > hikingtrails-runtime-service-account-key.json
dumb-init ./node_modules/.bin/remix-serve build
