#!/bin/bash

pnpm db:clean && pnpm db:migrate && pnpm server:start
