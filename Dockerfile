FROM node:18.16.0-bullseye-slim as base

ENV NODE_ENV production
ENV GOOGLE_APPLICATION_CREDENTIALS /app/.gcloud/hikingtrails-runtime-service-account-key.json

COPY --chown=node:node . /app

USER node
WORKDIR /app/apps/admin

CMD ["./docker-entrypoint.sh"]
