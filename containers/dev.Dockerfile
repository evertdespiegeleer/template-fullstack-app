FROM node:20

WORKDIR /app

COPY package*.json ./
COPY *config*.json ./
COPY .* ./

COPY packages ./packages
COPY scripts ./scripts

RUN chown -R node:node /app
USER node

# Setup
RUN npm run init

# Run app
CMD ["npm", "run", "start:dev"]