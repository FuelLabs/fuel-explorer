#!/bin/bash

echo "$0"
filename="./src/graphql/schemas/fuelcore.graphql"
echo "Fixing schema file $filename"
file=$(sed 's/witnessIndex: Int!/witnessIndex: U16!/g' "$filename")
echo "$file" >"$filename"
