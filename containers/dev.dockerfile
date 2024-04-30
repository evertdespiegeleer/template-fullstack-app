FROM node:22-alpine

RUN apk add coreutils jq bash

WORKDIR /app

COPY package*.json ./
COPY *config*.* ./
COPY .* ./

COPY packages ./packages
COPY scripts ./scripts

RUN chown -R node:node /app
USER node

# Setup
RUN npm run init

# Run app
CMD ["npm", "run", "start:dev"]