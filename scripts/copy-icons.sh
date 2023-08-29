#!/bin/bash

# Define the source and destination paths
SOURCE_PATH="./packages/app/node_modules/@fuel-ui/icons/dist/icons/sprite.svg"
DEST_PATH="./packages/app/public/icons"

# Check if the source file exists
if [ ! -f "$SOURCE_PATH" ]; then
	echo "Error: Source file $SOURCE_PATH does not exist."
	exit 1
fi

# Check if the destination folder exists
if [ ! -d "$DEST_PATH" ]; then
	echo "Error: Destination folder $DEST_PATH does not exist."
	exit 1
fi

# Copy the file
cp "$SOURCE_PATH" "$DEST_PATH"

# Check if the copy operation was successful
if [ $? -eq 0 ]; then
	echo "File copied successfully!"
else
	echo "Error: Failed to copy the file."
	exit 1
fi
