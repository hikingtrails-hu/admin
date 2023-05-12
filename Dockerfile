FROM node:18.16.0-bullseye-slim as base

ENV NODE_ENV production
ENV GOOGLE_APPLICATION_CREDENTIALS /home/node/hikingtrails-runtime-service-account-key.json

RUN mkdir /usr/local/gcloud
RUN chown -R node:node /usr/local/gcloud

COPY --chown=node:node . /app

USER node
WORKDIR /app/apps/admin

CMD ["./start.sh"]
