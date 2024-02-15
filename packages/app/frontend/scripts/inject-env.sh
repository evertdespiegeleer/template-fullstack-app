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
while IFS='=' read -r key template_value; do
    # Get the value of the environment variable
    actual_value="${!key}"
    # Only proceed if the variable is defined and not empty
    if [ ! -z "${actual_value}" ]; then
        keys+=("$key")
        values+=("${actual_value}")
    fi
done <<< "$templateObj"

echo '💉 Injecting frontend runtime env vars'

# Start the JSON object
echo "{" > "${env_out_dir}/env.json"
# Write the environment variables to env.json, adding commas except for the last item
for ((i=0; i<${#keys[@]}; i++)); do
    if [ $i -eq $(( ${#keys[@]} - 1 )) ]; then
        # Last item, do not add a comma
        echo "  \"${keys[i]}\": \"${values[i]}\"" >> "${env_out_dir}/env.json"
    else
        # Not the last item, add a comma
        echo "  \"${keys[i]}\": \"${values[i]}\"," >> "${env_out_dir}/env.json"
    fi
done
echo '}' >> "${env_out_dir}/env.json"

# # Create an env.js file which exports the environment variables
echo "window.__env__ = JSON.parse(\`$(cat "${env_out_dir}/env.json")\`)" > "${env_out_dir}/env.js"
