#!/bin/sh

command=$@

workspace_locations=$(npm query .workspace | jq -r '.[].location')

concurrentply_command="npx concurrently --kill-others"
for location in ${workspace_locations};
do
    concurrentply_command+=" \"(cd $location;$command)\""
done

eval $concurrentply_command