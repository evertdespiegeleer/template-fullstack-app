# Setup
FROM node:20-alpine as setup

ARG PACKAGE_PATH

WORKDIR /app

COPY package*.json ./
COPY *config*.* ./
COPY .* ./
COPY packages ./packages
COPY scripts ./scripts

RUN chown -R node:node /app
USER node

ENV NODE_ENV=development
RUN npm run init

# Build
FROM node:20-alpine as build

ARG PACKAGE_PATH

WORKDIR /app

COPY --from=setup /app/package*.json ./
COPY --from=setup /app/*config*.* ./
COPY --from=setup /app/.* ./
COPY --from=setup /app/packages ./packages
COPY --from=setup /app/scripts ./scripts
COPY --from=setup /app/node_modules ./node_modules

### Build the package
ENV NODE_ENV=production
RUN npm ci
RUN npm run -w ${PACKAGE_PATH} build
RUN npm prune --production

# Run
FROM nginx:stable-alpine

ARG PACKAGE_PATH

COPY --from=build /app/${PACKAGE_PATH}/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/${PACKAGE_PATH}/dist /usr/share/nginx/html

WORKDIR /app

CMD ["nginx", "-g", "daemon off;"]