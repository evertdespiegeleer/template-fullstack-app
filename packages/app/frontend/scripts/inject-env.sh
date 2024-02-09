#!/bin/bash

# Define the directory of the script
__dirname="$(dirname "$(readlink -f "$0")")"

env_json_template_file="${1:-"${__dirname}/../env.template.json"}"
env_out_dir="${2:-"${__dirname}/../public"}"

# Read the template JSON file and parse it with jq
templateObj=$(jq -r 'to_entries | map("\(.key)=\(.value)") | join("\n")' "${__dirname}/../env.template.json")

# Array to store keys
keys=()
# Array to store values
values=()

# Iterate over key-value pairs in the templateObj
while IFS='=' read -r key value; do
    keys+=("$key")
    # Get the value of the environment variable or set to null if not present
    value="${!key:-null}"
    values+=("$value")
done <<< "$templateObj"

echo '💉 Injecting frontend runtime env vars'

echo "{" > "${env_out_dir}/env.json"
# Write the environment variables to env.json
for ((i=0; i<${#keys[@]}; i++)); do
    echo "\"${keys[i]}\": \"${values[i]}\"" >> "${env_out_dir}/env.json"
done
echo '}' >> "${env_out_dir}/env.json"

# # Create an env.js file which exports the environment variables
echo "window.__env__ = JSON.parse(\`$(cat "${env_out_dir}/env.json")\`)" > "${env_out_dir}/env.js"
