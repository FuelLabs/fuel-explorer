pnpm ts:check
pnpm storybook build -o storybook
rm -rf ./public/storybook
mv ./storybook ./public
