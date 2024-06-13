#!/bin/bash

echo "Running Server"
pnpm db:migrate && pnpm server:start
