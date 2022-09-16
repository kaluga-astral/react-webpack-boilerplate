FROM cypress/browsers:node16.14.0-slim-chrome99-ff97

WORKDIR /app

# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# https://github.com/cypress-io/cypress-docker-images/issues/270
ENV QT_X11_NO_MITSHM=1
ENV _X11_NO_MITSHM=1
ENV _MITSHM=0
ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress

# Копируется информация о зависимостях
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./

# Копируются конфиги для сборки
COPY tsconfig.json ./
COPY webpack ./
COPY webpack.config.js ./
COPY babel.config.js ./

# Копируются исходники
COPY src ./
COPY public ./
COPY env ./
COPY cypress ./

RUN npm install

RUN npm run test:components
