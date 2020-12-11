FROM node:12-slim

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /app/package.json

RUN npm install --production

RUN npm build

COPY public /app/public

COPY src /app/src

EXPOSE 3000

CMD ["npm","start"]