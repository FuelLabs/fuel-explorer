#!/bin/bash

echo "Running Server"
pnpm install
pnpm db:setup
pnpm db:migrate
pnpm server:start
