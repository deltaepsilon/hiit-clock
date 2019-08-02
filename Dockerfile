FROM mhart/alpine-node:8

WORKDIR /app/functions

COPY ./app/functions/package.json package.json
COPY ./app/functions/yarn.lock yarn.lock
RUN yarn --pure-lockfile

WORKDIR /app

COPY ./app/package.json package.json
COPY ./app/yarn.lock yarn.lock
RUN yarn --pure-lockfile

ADD ./app /app

RUN yarn && yarn ci:build
