FROM node:18.14.2-bullseye-slim as base

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        dumb-init && \
    apt-get clean

FROM base

ENV NODE_ENV production

COPY --chown=node:node . /app
USER node
WORKDIR /app

CMD ["dumb-init", "./node_modules/.bin/remix-serve", "build"]
