#!/bin/bash

echo "Running Server"
pnpm db:setup
pnpm db:migrate
pnpm server:start
