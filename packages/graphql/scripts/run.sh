#!/bin/bash

echo "Running Server"
pnpm db:clean && pnpm db:migrate && pm2-runtime ecosystem.config.cjs
