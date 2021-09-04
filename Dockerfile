FROM node:10-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

FROM caddy:2

WORKDIR /usr/share/caddy

COPY --from=builder /app/public .