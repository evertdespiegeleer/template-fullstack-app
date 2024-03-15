#!/bin/sh

# Create .env file if not yet present
if [ ! -f "./.env" ];
then
    echo "Creating .env file..."
    cp .env.example .env
fi

# Load the .env file without overriding already set environment variables
curenv="$(export -p)"
set -a; . ./.env; set +a
eval "${curenv%x}"

# Install dependencies
npm ci --verbose --proxy http://docker.for.mac.localhost:8888

# Build libs in the right order
npm run -w packages/lib/apiclient build
