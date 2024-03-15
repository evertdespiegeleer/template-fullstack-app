# Setup
FROM node:21-alpine as setup

ARG PACKAGE_PATH

RUN apk add coreutils jq

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
FROM node:21-alpine as build

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
RUN npm run -w ${PACKAGE_PATH} build
RUN npm prune --production

# Run
FROM node:21-alpine as run

ARG PACKAGE_PATH
ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/*config*.* ./
COPY --from=build /app/.* ./
COPY --from=build /app/packages/lib ./packages/app/lib
COPY --from=build /app/node_modules ./node_modules

COPY --from=setup /app/${PACKAGE_PATH} ./${PACKAGE_PATH}

RUN chown -R node:node /app
USER node

WORKDIR /app/${PACKAGE_PATH}

CMD ["npm", "run", "start"]