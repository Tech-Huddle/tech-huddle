FROM node:16 AS build

COPY src app

WORKDIR app

RUN npm install
EXPOSE 5000
ENTRYPOINT npm start