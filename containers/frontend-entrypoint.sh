#!/bin/bash

TEMPLATE_ENV_FILE_LOCATION=/app/env.template.json
ENV_OUT_DIR=/usr/share/nginx/html

SCRIPT_DIR=/app/scripts/inject-env.sh
source $SCRIPT_DIR/inject-env.sh $TEMPLATE_ENV_FILE_LOCATION $ENV_OUT_DIR

echo "Starting nginx..."

nginx -g "daemon off;"