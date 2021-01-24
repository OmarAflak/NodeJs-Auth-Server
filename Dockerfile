FROM node:latest
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install
COPY app/ /usr/src/app/src
