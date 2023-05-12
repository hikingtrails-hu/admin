#!/usr/bin/env bash

set -Eeuo pipefail

echo "$GCLOUD_RUNTIME_SERVICE_ACCOUNT" | base64 --decode > /usr/local/gcloud/hikingtrails-runtime-service-account-key.json

exec "$@"
