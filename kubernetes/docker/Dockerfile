# Stage 1
FROM nexus.sifast.com:8087/node:14.17 as node
WORKDIR /plateforme-sifast-root-config

ARG env

COPY . .

RUN npm ci

# Build project for each env
RUN npm run build:types
RUN npm run build:webpack-${env}

# Copy Maintenance Mode Files
COPY ./src/503.html ./dist/maintenance/503.html
COPY ./maintenance.sh ./dist/maintenance/maintenance.sh

# Stage 2
FROM nexus.sifast.com:8087/nginx-ssl:1.0
COPY --from=node /plateforme-sifast-root-config/dist /usr/share/nginx/html
COPY kubernetes/docker/config/nginx.conf /etc/nginx/conf.d/default.conf
