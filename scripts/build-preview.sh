#!/bin/sh

# Build using pnpm
pnpm --filter=app build:preview

# Check if the build was successful
if [ $? -ne 0 ]; then
	echo "Build failed. Exiting."
	exit 1
fi

# Copy the storybook-static folder to the next folder
cp -r storybook-static next/

# Check if the copy was successful
if [ $? -ne 0 ]; then
	echo "Copying failed. Exiting."
	exit 1
fi

echo "Build and copy completed successfully!"
