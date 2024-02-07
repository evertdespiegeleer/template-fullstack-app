#!/bin/sh

# Create .env file if not yet present
if [ ! -f "./.env" ];
then
    echo "Creating .env file..."
    cp .env.example .env
fi

# Install dependencies
npm ci --verbose
