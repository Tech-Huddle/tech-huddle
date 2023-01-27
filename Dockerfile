FROM node:16 AS build

COPY . app

WORKDIR app

RUN npm install
EXPOSE 5000
ENTRYPOINT npm start