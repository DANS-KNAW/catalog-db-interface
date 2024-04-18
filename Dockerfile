FROM node:18-alpine AS builder

RUN apk update && apk add git && npm i -g turbo && npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./

# Install pnpm




RUN pnpm install

COPY . .

COPY .env ./

RUN pnpm run build

EXPOSE 3001

CMD ["npm", "run", "start:prod"]