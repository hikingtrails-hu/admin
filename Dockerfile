FROM node:18.14.2-bullseye-slim as base

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        dumb-init && \
    apt-get clean

FROM base

ENV NODE_ENV production
ENV GOOGLE_APPLICATION_CREDENTIALS hikingtrails-runtime-service-account-key.json

COPY --chown=node:node . /app
COPY --chown=node:node ./.cache /app/cache

USER node
WORKDIR /app

CMD ["./start.sh"]
