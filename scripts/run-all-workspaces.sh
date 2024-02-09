#!/bin/sh

command="$@"

workspace_locations=$(npm query .workspace | jq -r '.[].location')

concurrently_command="npx concurrently --kill-others"
names=""
commands=""
for location in ${workspace_locations}; do
    names="$names,$location"
    commands="$commands \"(cd $location; ${command})\""
done

names=${names:1}  # Remove leading comma
concurrently_command="$concurrently_command -n $names $commands"

echo "$concurrently_command"

eval "$concurrently_command"
