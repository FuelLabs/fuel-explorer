#!/bin/bash

pnpm db:clean && pnpm db:migrate && pm2-runtime ecosystem.config.mjs
