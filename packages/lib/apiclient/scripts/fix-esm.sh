#!/bin/sh

# The code outputed by Orval doesn't use file extensions in its imports. We gotta fix this bacause ESM.

SCRIPT=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")
CODEGEN_DIRECTORY=$(cd $SCRIPT_DIR && cd "../src/generated"; pwd)

# Find all .ts files in the directory and subdirectories
find "$CODEGEN_DIRECTORY" -type f -name "*.ts" | while read -r file; do
    # Append '.js' to import statements without file extension
    sed -i.bak -E "s/from '([^']*)'/from '\1.js'/g" "$file"
    sed -i.bak -E 's/from "([^"]*)"/from "\1.js"/g' "$file"

    # Remove backup files created by sed
    rm "${file}.bak"
done
