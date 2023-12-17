# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /
COPY . .
RUN yarn install --production && yarn dev
EXPOSE 3000