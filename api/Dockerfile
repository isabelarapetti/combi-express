FROM node:12-slim as build

WORKDIR /code

COPY package.json /code/package.json
RUN npm install

COPY ./tsconfig.json /code/
COPY src /code/src

RUN npm run build

FROM node:12 as final

WORKDIR /app

COPY migrate.sh /app/migrate.sh

# postgres driver dependency used in run.sh
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

ARG JWT_SECRET
ENV JWT_SECRET $JWT_SECRET

ARG EXPIRES_IN
ENV EXPIRES_IN $EXPIRES_IN

COPY package.json /app/package.json

RUN npm install --production

COPY --from=build /code/dist /app/dist

COPY migrations /app/migrations

EXPOSE 8000