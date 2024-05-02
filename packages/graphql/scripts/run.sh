#!/bin/bash

pnpm db:clean && pnpm db:setup && pnpm db:migrate && pnpm server:start
