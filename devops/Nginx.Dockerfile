FROM node:16 AS build

WORKDIR /usr/src/app

# Копируется информация о зависимостях
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY .npmrc ./.npmrc

# Копируются конфиги для сборки
COPY tsconfig.json ./tsconfig.json
COPY webpack ./webpack
COPY webpack.config.js ./webpack.config.js
COPY babel.config.js ./babel.config.js

# Копируются исходники
COPY src ./src
COPY public ./public
COPY env ./env

# Игнорируются devDependency рпи установке зависимостей
RUN npm i --production

ARG API_URL

RUN npm run build:prod

FROM fholzer/nginx-brotli:v1.16.0
COPY devops/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
