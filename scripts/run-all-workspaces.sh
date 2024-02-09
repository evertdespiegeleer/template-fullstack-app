#!/bin/sh

command="$@"

workspace_locations=$(npm query .workspace | jq -r '.[].location')

concurrently_command="npx concurrently --kill-others"
for location in ${workspace_locations}; do
    concurrently_subcommand="(cd $location; ${command})"
    concurrently_command="$concurrently_command \"$concurrently_subcommand\""
done

echo "$concurrently_command"

eval "$concurrently_command"
